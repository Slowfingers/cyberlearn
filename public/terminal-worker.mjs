// No Firebase SDK or credentials are loaded in the execution worker.
const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs';
self.onmessage = async ({ data: { language, code, reference } }) => {
  try {
    let run;
    if (language === 'javascript') {
      run = source => {
        const lines = [];
        const console = { log:(...args) => { lines.push(args.map(String).join(' ')); if (lines.join('\n').length > 20000) throw new Error('Слишком большой вывод'); } };
        Function('console', '"use strict";\n'+source)(console);
        return lines.join('\n');
      };
    } else {
      const { loadPyodide } = await import(PYODIDE_URL);
      const pyodide = await loadPyodide({indexURL:PYODIDE_URL.replace('pyodide.mjs','')});
      run = async source => {
        const lines = [];
        pyodide.setStdout({batched:line => { lines.push(line); if (lines.join('\n').length > 20000) throw new Error('Слишком большой вывод'); }});
        pyodide.setStderr({batched:line => { throw new Error(line); }});
        const globals = pyodide.toPy({__name__:'__main__'});
        try {
          if (language === 'sql') {
            globals.set('student_sql',source);
            await pyodide.runPythonAsync(`
import sqlite3
connection = sqlite3.connect(':memory:')
connection.executescript('''
CREATE TABLE players (name TEXT, role TEXT, level INTEGER, status TEXT);
INSERT INTO players VALUES ('Neo','hacker',14,'active'),('Morpheus','teacher',25,'active'),('Smith','agent',5,'inactive');
CREATE TABLE leaderboard (username TEXT, score INTEGER);
INSERT INTO leaderboard VALUES ('CyberGhost',9840),('ZeroCool',9210),('Trinity',8950),('Agent',100);
''')
statement = ''
for character in student_sql:
    statement += character
    if character == ';' and sqlite3.complete_statement(statement):
        cursor = connection.execute(statement)
        if cursor.description:
            print(' | '.join(column[0] for column in cursor.description))
            for row in cursor.fetchall(): print(' | '.join(map(str,row)))
        statement = ''
if statement.strip():
    cursor = connection.execute(statement)
    if cursor.description:
        print(' | '.join(column[0] for column in cursor.description))
        for row in cursor.fetchall(): print(' | '.join(map(str,row)))
connection.close()
`, {globals});
          } else await pyodide.runPythonAsync(source,{globals});
          return lines.join('\n');
        } finally { globals.destroy(); }
      };
    }
    self.postMessage({ready:true});
    const expected = await run(reference);
    const output = await run(code);
    self.postMessage({output,expected});
  } catch (error) { self.postMessage({error:String(error.message || error)}); }
};

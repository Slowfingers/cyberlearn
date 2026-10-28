export async function compileArduinoCode(code:string,signal?:AbortSignal):Promise<string>{
 const response=await fetch('/api/arduino/compile',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code}),signal});
 let data:{hex?:string;error?:string};try{data=await response.json();}catch{throw new Error('Компилятор C++ не подключён к этому серверу. Выбери учебный режим.');}
 if(!response.ok||!data.hex)throw new Error(data.error||'Не удалось скомпилировать программу.');return data.hex;
}

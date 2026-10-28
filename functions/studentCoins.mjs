/** Server-owned coin adjustment: validates membership, balance and repeated requests. */
export function adjustStudentCoins(student,teacher,classroom,data){
 if(teacher?.role!=='teacher'||classroom?.teacherId!==teacher.id||student?.role!=='student'||student.classId!==classroom?.id)throw new Error('Нет доступа к ученику этого класса.');
 const {amount,action,requestId}=data;
 if(!Number.isInteger(amount)||amount<1||amount>100000||!['award','fine'].includes(action))throw new Error('Укажите целое число монет от 1 до 100 000.');
 if(typeof requestId!=='string'||!/^[a-zA-Z0-9_-]{8,100}$/.test(requestId))throw new Error('Неверный идентификатор операции.');
 if(data.reason!==undefined&&(typeof data.reason!=='string'||data.reason.length>200))throw new Error('Причина должна быть не длиннее 200 символов.');
 const reason=(data.reason??'').trim(),delta=action==='award'?amount:-amount;
 const previous=(student.coinAdjustments??[]).find(entry=>entry.id===requestId);
 if(previous){if(previous.teacherId!==teacher.id||previous.delta!==delta||previous.reason!==reason)throw new Error('Эта операция уже использована.');return student;}
 const balance=(student.currency??0)+delta;
 if(balance<0)throw new Error('Недостаточно монет для такого штрафа. Уменьшите сумму.');
 if(!Number.isSafeInteger(balance))throw new Error('Превышен допустимый баланс.');
 const entry={id:requestId,teacherId:teacher.id,delta,reason,balance,at:new Date().toISOString()};
 return {...student,currency:balance,coinAdjustments:[...(student.coinAdjustments??[]),entry]};
}

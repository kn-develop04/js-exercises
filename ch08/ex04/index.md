予想  
false,true  
true,false

結果  
false true  
true false

理由  
入れ子のメソッドnmでは、関数を呼び出したオブジェクト(nest)がthisになる。
アロー関数arrowでは、呼び出し元がobjなので、objがthisとなる。

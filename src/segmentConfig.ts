type segment = {
  type: string;
  operatorType?: string;
  group: [segment]
}
// a & b & (c || d)
const data ={
  key: "root",
  operatorType: "AND",
  segments: [
    {
      key: "a",
      type: "text", value: null
    },
    // {
    //   key: "b",
    //   type: "dropdown", value: ""},
    // {
    //   key: "c",
    //   operatorType: "OR",
    //   segments: [
    //     {type: "text", value: ""},
    //     {type: "text", value: ""}
    //   ]
    // }
  ]
}

   /*
   a & d & (e || f)
    

  
   
   */
   export default data;
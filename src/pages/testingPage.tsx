import { ParseXml } from "@/functions/XMlParser"
import { todoListAppCode } from "@/sampleResponse";

export default function TestingPage(){


    function handleButton (){
        console.log("running");
        const response = ParseXml(todoListAppCode)
        console.log(response);
    }



    return <div>
    
    <button onClick={handleButton} >run xmlParser</button>
    
    
    </div>
}
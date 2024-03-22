import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { Palabra, Significados, Definiciones } from "../type.ts"


export const Form: FunctionComponent = () => {
   
    const[palabra, setPalabra] = useState<string | undefined>("")
    const[data, setData] = useState<Palabra[]>([])
    

   const fetchPalabra = async (p:string) => {
        try{
            
            const api = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${p}`)
            if(api.status !== 200){
                throw new Response("error fetching words", {status:500})
            }
            const json:Palabra[] = await api.json()
            
            setData(json)

        }catch(e){
            throw new Response("error fetching words", {status:500})
        }
   }
   

    return (
        <>
            
            <div class="container">
                <div class="wordForm">
                    <input type="text" name="palabra" placeholder="Type a word" onInput={(e) => setPalabra(e.currentTarget.value)}></input>
                    <button onClick={() =>fetchPalabra(palabra!)}>Search</button>
                </div>        
            </div>

            {data && 
            <div class="container">
                {data.map((e) => { return (
                    <>
                    <h3> {e.word}</h3>
                    
                    <p> {e.meanings.map((e) => { return (
                        <>
                        {
                            e.definitions.map((d) => { return(
                            <ul>
                                <li key={d}>
                                    <p>
                                        <span>
                                            <strong> Definition: </strong>
                                        </span>
                                        <span>{d.definition} </span>
                                    
                                        
                                    </p>
                                    <p>
                                       <span>
                                            <strong> Example: </strong>
                                        </span>
                                        <span>{d.example} </span> 
                                    </p>

                                </li>
                                
                            </ul>
                        )
                            
                        })
                        }
                        </>
                    )
                        
                    })}</p>
                    </>
                )
                    
                })}
            </div>
            }
        </>
        
    )
}
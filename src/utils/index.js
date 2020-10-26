import axios from "axios"
function getApi(url,methods,data){
  if(methods == 'get'){
    axios[methods]('/api'+url,{
        params: data?JSON.parse(data):{}
      }
    )
  }
  if(methods == 'post'){
    axios[methods]('/api'+url,data?JSON.parse(data):{}
    )
  }
}

async function handlerApi(url,methods,data){
  await getApi(...arguments)
}

export function test(url,times,methods,data){
  for(let i = 0; i<times; i++){
    handlerApi(url,methods,data)
  }
}

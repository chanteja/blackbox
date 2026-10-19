import {body,create,failure,getSession,json,latest,mutate,owner,sameOrigin} from '../lib/session-store';
import {withVisitor,methodNotAllowed} from '../server/visitor.mjs';

async function GET(request:Request){
  try{
    const id=new URL(request.url).searchParams.get('id');
    const user=owner(request);
    return json({session:id?await getSession(user,id):await latest(user)});
  }catch(error){
    return failure(error);
  }
}

async function POST(request:Request){
  try{
    sameOrigin(request);
    const id=owner(request);
    const input=await body(request);
    return json({session:input.action==='create'?await create(id,input):await mutate(id,input)});
  }catch(error){
    return failure(error);
  }
}

export default {
  fetch:withVisitor((request:Request)=>request.method==='GET'?GET(request):request.method==='POST'?POST(request):methodNotAllowed())
};

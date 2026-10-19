import {failure,json,owner,pairExplanation} from '../lib/session-store';
import {withVisitor,methodNotAllowed} from '../server/visitor.mjs';

async function GET(request:Request){
  try{
    const user=owner(request);
    const params=new URL(request.url).searchParams;
    return json({explanation:await pairExplanation(user,{
      session_id:params.get('session_id'),
      revision:params.get('revision'),
      a:params.get('a'),
      b:params.get('b')
    })});
  }catch(error){
    return failure(error);
  }
}

export default {
  fetch:withVisitor((request:Request)=>request.method==='GET'?GET(request):methodNotAllowed())
};

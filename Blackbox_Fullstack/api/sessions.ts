import {failure,json,listSessions,owner} from '../lib/session-store';
import {withVisitor,methodNotAllowed} from '../server/visitor.mjs';

async function GET(request:Request){
  try{
    return json({sessions:await listSessions(owner(request))});
  }catch(error){
    return failure(error);
  }
}

export default {
  fetch:withVisitor((request:Request)=>request.method==='GET'?GET(request):methodNotAllowed())
};

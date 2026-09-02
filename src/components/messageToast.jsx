import { useSelector } from "react-redux";

function MessageToast(){
  const messages = useSelector((state )=> state.message);
    return(
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
 {messages.map((message) => (
        <div key={message.id} className="toast align-items-center text-bg-primary border-0 show" role="alert" aria-live="assertive" aria-atomic="true">
  <div className="d-flex">
    <div className="toast-body ">
              {message.text}
    </div>
    <button type="button" className="btn-close btn-close-dark me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>
       
      ))}
      </div>
    )
}

export default MessageToast;

 
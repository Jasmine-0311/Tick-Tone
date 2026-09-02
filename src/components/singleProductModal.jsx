function singleProductModal() {
    return (
        <>
        <div className="modal" id="productModal">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">產品名稱：</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <img className="w-100" src={null} />
        <p className="mt-3">產品內容：</p>
        <p>產品描述：</p>
        <p>
          價錢：<del>原價 $</del>，特價：$
        </p>
        <div className="d-flex align-items-center">
          <label style={{ width: "150px" }}>購買數量：</label>
          <button
            className="btn btn-danger"
            type="button"
            id="button-addon1"
            aria-label="Decrease quantity"
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          <input
            className="form-control"
            type="number"
            min="1"
            max="10"
          />
          <button
            className="btn btn-primary"
            type="button"
            id="button-addon2"
            aria-label="Decrease quantity"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary">
          加入購物車
        </button>
      </div>
    </div>
  </div>
</div>
        </>
    )
}

export default singleProductModal;
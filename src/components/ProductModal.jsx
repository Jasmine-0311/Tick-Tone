function ProductModal({
    productModalRef,
    modalType,
    templateProduct,
    handleModalInputChange,
    handleModalImageChange,
    handleAddImage,
    handleDeleteImage,
    updateProduct,
    deleteProduct,
    closeModal,
    uploadImage
}) {
    return (
 <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true" >
  <div className="modal-dialog modal-xl">
    <div className="modal-content border-0">
      <div className={`modal-header bg-${modalType === "delete" ? "danger" : "dark"} text-white`}>
        <h5 id="productModalLabel" className="modal-title">
          <span>{modalType === "delete" ? "刪除產品" : modalType === "edit" ? "編輯產品" : "新增產品"}</span>
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="modal"
          aria-label="Close"
          ></button>
      </div>
      <div className="modal-body">
        {
        modalType === "delete" ?(	<p className="fs-4">
	  確定要刪除
	  <span className="text-danger">{templateProduct.title}</span>嗎？
	</p>) :(

        <div className="row">
          <div className="col-sm-4">
            <div className="mb-2">
                <div className="mb-3">
                     <label htmlFor="fileUpload" className="form-label">
                  上傳圖片
                </label>
                <input className="form-control" type="file" name="fileUpload" id="fileUpload" accept=".jpg, .jpeg, .png"
                onChange={(e)=>uploadImage(e)} />
                </div>
              <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">
                  輸入圖片網址
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  className="form-control"
                  placeholder="請輸入圖片連結"
                  value={templateProduct.imageUrl}
                  onChange={(e) => handleModalInputChange(e)}
                  />
              </div>
              {
                templateProduct.imageUrl && (
                  <img className="img-fluid" src={templateProduct.imageUrl} alt="主圖" />

                )
              }
            </div>
            <div>
               {
                  templateProduct.imagesUrl.map((url, index) => (
              <div key={index}>
					      <label htmlFor="imageUrl" className="form-label">
					        輸入圖片網址
					      </label>
					      <input
					        type="text"
					        className="form-control"
					        placeholder={`圖片網址${index + 1}`}
                  value={url}
                  onChange={(e)=>handleModalImageChange(index, e.target.value)}
					      />
                {
                  url && 
					      <img
                  className="img-fluid"
                  src={url}
                  alt={`副圖${index + 1}`}
                />
                }
					    </div>
                    
                  ))
                }
              <button className="btn btn-outline-primary btn-sm d-block w-100 mb-2"
              onClick={()=>handleAddImage()}>
                新增圖片
              </button>
            </div>
            <div>
              <button className="btn btn-outline-danger btn-sm d-block w-100"
              onClick={()=>handleDeleteImage()}>
                刪除圖片
              </button>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">標題</label>
              <input
                name="title"
                id="title"
                type="text"
                className="form-control"
                placeholder="請輸入標題"
                value={templateProduct.title}
                onChange={(e)=>handleModalInputChange(e)}
                />
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label htmlFor="category" className="form-label">分類</label>
                <input
                  name="category"
                  id="category"
                  type="text"
                  className="form-control"
                  placeholder="請輸入分類"
                  value={templateProduct.category}
                onChange={(e)=>handleModalInputChange(e)}
                  />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="unit" className="form-label">單位</label>
                <input
                  name="unit"
                  id="unit"
                  type="text"
                  className="form-control"
                  placeholder="請輸入單位"
                  value={templateProduct.unit}
                onChange={(e)=>handleModalInputChange(e)}
                  />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label htmlFor="origin_price" className="form-label">原價</label>
                <input
                  name="origin_price"
                  id="origin_price"
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder="請輸入原價"
                  value={templateProduct.origin_price}
                onChange={(e)=>handleModalInputChange(e)}
                  />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="price" className="form-label">售價</label>
                <input
                  name="price"
                  id="price"
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder="請輸入售價"
                  value={templateProduct.price}
                onChange={(e)=>handleModalInputChange(e)}
                  />
              </div>
            </div>
            <hr />

            <div className="mb-3">
              <label htmlFor="description" className="form-label">產品描述</label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                placeholder="請輸入產品描述"
                value={templateProduct.description}
                onChange={(e)=>handleModalInputChange(e)}
                ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">說明內容</label>
              <textarea
                name="content"
                id="content"
                className="form-control"
                placeholder="請輸入說明內容"
                value={templateProduct.content}
                onChange={(e)=>handleModalInputChange(e)}
                ></textarea>
            </div>
            <div className="mb-3">
              <div className="form-check">
                <input
                  name="is_enabled"
                  id="is_enabled"
                  className="form-check-input"
                  type="checkbox"
                  checked={templateProduct.is_enabled}
                  onChange={(e)=>handleModalInputChange(e)}
                  />
                <label className="form-check-label" htmlFor="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>
  )
        }
      </div>
      <div className="modal-footer">
        {
          modalType === "delete" ?(<button
    type="button"
    className="btn btn-danger"
    onClick={()=>deleteProduct(templateProduct.id)}
  >
    刪除
  </button>) :(
    <>
    <button
      type="button"
      className="btn btn-outline-secondary"
      data-bs-dismiss="modal"
      onClick={() => closeModal()}
      >
      取消
    </button>
    <button type="button" className="btn btn-primary"
    onClick={()=>updateProduct(templateProduct.id)}>確認</button>
    
    </>
  )
        }
      </div>
    </div>
  </div>
</div>
    )
}


export default ProductModal;
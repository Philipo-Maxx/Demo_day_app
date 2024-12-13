import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import { ProductImageUpload } from "@/components/admin/image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editAProduct,
  fetchAllProducts,
} from "@/store/admin/product-slice";
import { useToast } from "@/hooks/use-toast";
import { AdminProductTile } from "@/components/admin/product-tile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};
const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productList } = useSelector((state) => state.adminProducts);

  //Store current ID of Card edited
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { toast } = useToast();
  const dispatch = useDispatch();
  
  const onSubmit = (event) => {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editAProduct({ id: currentEditedId, formData: formData })
        ).then((data) => {
          console.log(data, "edit");
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());

            setFormData(initialFormData);

            setOpenCreateProductsDialog(false);

            setCurrentEditedId(null);

            //show toast
            toast({ title: `Product edited successfully` });
          }
        })
      : dispatch(addNewProduct({ ...formData, image: imageUrl })).then(
          (data) => {
            console.log(data?.payload?.success);

            //fetch all products
            dispatch(fetchAllProducts());

            //step-1 => reset form
            setImageFile(null);
            setFormData(initialFormData);

            //show toast
            toast({ title: `Product added successfully` });

            //close sheet
            setOpenCreateProductsDialog(false);
          }
        );
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  const handleDelete = (getCurrentProductId) => {
    console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        //on Delete
        dispatch(fetchAllProducts());

        //show toast
        toast({ title: `Product deleted successfully` });
      }
    });
  };
  //Use Effect to call fetch all products on Page load

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(productList, imageUrl, "productList");
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => {
            setOpenCreateProductsDialog(true);
          }}
        >
          {" "}
          Add New Product
        </Button>
      </div>
      {/* Render list of Product */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setFormData={setFormData}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {" "}
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            file={imageFile}
            setFile={setImageFile}
            uploadedImageUrl={imageUrl}
            setUploadedImageUrl={setImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              onSubmit={onSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;

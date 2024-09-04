import ListComponent from "../../components/ListComponent/ListComponent";

const mockData = [
    // Thêm dữ liệu m��u
    { id: 1, name: 'Product 1', price: 100, description: 'Product 1 description' },
    { id: 2, name: 'Product 2', price: 200, description: 'Product 2 description' },
    { id: 3, name: 'Product 3', price: 300, description: 'Product 3 description' },

];

const listName = 'Products';

const handleEdit = (item) => {
    console.log('Edit', item);
    // Xử lý chỉnh sửa
};

const handleDelete = (item) => {
    console.log('Delete', item);
    // Xử lý xóa
};

function ProductPage() {
    return (
        <div className="product">
            <ListComponent data={mockData} listName={listName} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}
export default ProductPage
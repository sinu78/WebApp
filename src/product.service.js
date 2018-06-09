import axios from 'axios';
class ProductService {
    static getProductsList(page_no) {
        return axios.get('products?page='+page_no);
    }
    static getProductDetails(id) {
        return axios.get('products/'+id);
    }
}
export default ProductService
import React, { Component } from 'react';
import {Col,Button} from 'react-bootstrap';
import ProductService from'./product.service';
import {Link } from 'react-router-dom';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList:[],
      page_no:1
    };
    // this.handleScroll=this.handleScroll.bind(this);
  }

  componentDidMount(){
    this.getProducts(this.state.page_no);
    window.addEventListener('scroll', this.handleScroll);
  } 
  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
  }

  onClick(){
    this.setState({ page_no:this.state.page_no+1}, () => {
      this.getProducts(this.state.page_no);
    });     
  }

  getProducts(page_no) {
    ProductService.getProductsList(page_no).then((res)=>{
      let productList = [...this.state.productList, ...res.data.products];
      this.setState({productList:productList});
    });
  }

  render() {
    const products=this.state.productList;
    const load_more_button= <Col lg={12} className="text-center">
          <Button id="load_more" bsStyle="link" onClick={(e)=>this.onClick(e)}>Laod More</Button>
        </Col>;
    const productList=products.map((item)=>(
      <Col key={item._id} lg={3} xs={6} sm={6} className="product-box">
        <div className="img-area">
          <Link to={`/product_detail/${item._id}`}>
            <img src={item.images[0]} alt={item.name}/>
          </Link>
        </div>
        <Link to={`/product_detail/${item._id}`} className="product-title">
          {item.name}
        </Link>  
        <img src="http://i.stack.imgur.com/nGbfO.png" width="8" height="10" alt=""/>
        <span className="product-price">{parseInt(item.sale_price,16)}</span>
      </Col>  
      ));
    return (
      <React.Fragment>
        {productList}
        {load_more_button}
      </React.Fragment>
    );
  }
}

export default Products;

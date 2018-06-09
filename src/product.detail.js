import React, { Component } from 'react';
import {Grid, Col, Row,Alert} from 'react-bootstrap';
import ProductService from'./product.service';

class Quantity extends Component{
  constructor(props){
    super(props);
    this.state={quantity:1};
  }

  minus(){
    if(this.state.quantity > 1){
      this.setState({quantity:this.state.quantity-1}); 
      }
  }

  plus(){
     this.setState({quantity:this.state.quantity+1}); 
  }

  render(){
    const quantity = this.state.quantity;
    return(<div className="quantity-section">
            <span className="quantity-title">Quantity</span>
            <div className="quantity-box">
              <button onClick={()=>this.minus()}>-</button>
              <input readOnly type="text" value={quantity}/>
              <button onClick={()=>this.plus()}>+</button>
            </div>
          </div>);
  }
} 

class FeaturedImage extends Component {
  render(){
    const image = this.props.images;
    return(
      <div className="featured-image">
        <img src={image[0]}/>
      </div>
    );
  }
} 

class Colors extends Component {
   constructor(props){
    super(props);
  }
  colorFilter(event,id){
    this.props.colorFilter(id);
    let button=document.getElementById('color-box').childNodes;
    for (var i = 0; i < button.length; i++) {
          button[i].classList.remove('active');
    }
    event.target.classList.add("active");
  }

  render(){
    const colors = this.props.colors;
    const selected_option = this.props.selected_option;
    const button = colors.map((item)=><button onClick={(event,id)=>this.colorFilter(event,item._id)} className={(item._id === selected_option[0]||item._id === selected_option[1])?'active':''} key={item._id}><span className={item.name}></span> {item.name}</button>);
    return(
      <div id="color-box">
        <div className="text">{colors.length} color available</div>
        <React.Fragment>{button}</React.Fragment>
      </div>
    );
  }
} 

class Sizes extends Component {
  constructor(props){
    super(props);
  }
  sizeFilter(event,id){
    this.props.sizeFilter(id);
    let button=document.getElementById('size-box').childNodes;
    for (var i = 0; i < button.length; i++) {
          button[i].classList.remove('active');
    }
    event.target.classList.add("active");
  }

  render(){
    const sizes=this.props.sizes;
     const selected_option = this.props.selected_option;
    const button=sizes.map((item)=><button onClick={(event,id)=>this.sizeFilter(event,item._id)}  className={(item._id === selected_option[0]||item._id === selected_option[1])?'active':''} key={item._id}>{item.name}</button>);
    return(
      <div id="size-box">
        <div className="text">{sizes.length} Size available</div>
        <React.Fragment>{button}</React.Fragment>
      </div>
    );
  }
} 


class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state={
      productData:'',
      productColorId:'',
      productSizeId:''
    }
    this.colorFilter=this.colorFilter.bind(this);
    this.sizeFilter=this.sizeFilter.bind(this);
  }

  colorFilter(id){
    this.setState({productColorId:id});
  }

  sizeFilter(id){
    this.setState({productSizeId:id});
  }

  componentWillMount(){
    const { match: { params } } = this.props;
    ProductService.getProductDetails(params.id).then((res)=>{
      this.setState({productData:res.data,productColorId:res.data.selected_option_ids[1],productSizeId:res.data.selected_option_ids[0]});       
    }) 
  }

  render() {
    const product_id = this.props.match.params.id;
    const productData = this.state.productData;
    const productColorId = this.state.productColorId;
    const productSizeId = this.state.productSizeId;
    console.log(productColorId);
    console.log(productSizeId);
    let filterData = productData?productData.product_variations.filter((item)=>(item.sign[0]===productSizeId && item.sign[1]===productColorId) || (item.sign[1]===productSizeId && item.sign[0]===productColorId)):'';
    filterData=filterData[0];

    const productTitle = filterData?filterData.name:'';
    const Images = filterData?filterData.images:''; 
    const productDesc = productData?productData.primary_product.desc:'';
    const productSalePrice = filterData?parseInt(filterData.sale_price):'';
    const productMarkPrice = filterData?parseInt(filterData.mark_price):'';
    const dicountPrice =  parseInt(((productMarkPrice-productSalePrice)/productMarkPrice)*100);

    let colors=productData?productData.options.filter((item)=>item.attrib_id===productData.attributes[1]._id):'';
    let sizes=productData?productData.options.filter((item)=>item.attrib_id===productData.attributes[0]._id):'';
    const selected_option=productData?productData.selected_option_ids:'';
    const quantity=this.state.quantity;

    const error=<Col className="errorClass" lg={12}>
                    <Alert bsStyle="danger">
                      <h4>Filter Not Match Please Choose Different Combination.</h4>
                    </Alert>
                </Col>;

    return (
      <Grid>
        <Row>
        <Col className="product-lefta-area" lg={6}>
          {Images?<FeaturedImage images={Images}/>:''}
        </Col>
        <Col className="product-right-area" lg={6}>
          <h2 className="product-detail-title">{productTitle}</h2>
          <p className="product-detail-description">{productDesc.length > 140?productDesc.substr(0,140):productDesc}</p>
          <div className="price-section">
            <div className="detail-price">
              {productSalePrice?'Rs.'+productSalePrice:''}
              <span className="mark_price">{productMarkPrice?'Rs.'+productMarkPrice:''}</span>
            </div>
            <div className="save_ruppes">
              You save Rs.{productMarkPrice-productSalePrice} ({dicountPrice?dicountPrice+'%':''})
            </div>
            <div className="taxMessage">
              Local taxes included (where applicable)
            </div>
          </div>
          {colors?<Colors colorFilter={this.colorFilter} selected_option={selected_option} colors={colors}/>:''}
          {sizes?<Sizes sizeFilter={this.sizeFilter} selected_option={selected_option} sizes={sizes}/>:''}
          <Quantity/>
          <button className="add-to-card">Add to cart</button>
        </Col>
        {filterData===undefined?error:''}
        </Row>
      </Grid>
    );
  }
}
export default ProductDetail;

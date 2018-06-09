import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Col, Row} from 'react-bootstrap';
import './index.css';
import Products from './products';
import ProductDetail from'./product.detail';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

axios.defaults.baseURL = 'https://assignment-appstreet.herokuapp.com/api/v1/';
const App =()=>(
	<Router>
		<React.Fragment>
		<header>
			<Grid>
				<Row>
					<Col className="logo" lg={3} md={3} sm={4}>
						My Awesome Shop
					</Col>
					<Col xsHidden className="menu text-right float-right" lg={9} md={9} sm={8}>
						<ul>
							<li><Link to='/'>Home</Link></li>
						</ul>
					</Col>
				</Row>
			</Grid>
		</header>
		<Grid className="mid-section">
			<Row>
				<Route exact path="/" component={Products}/>
				<Route path="/product_detail/:id" component={ProductDetail}/>
			</Row>
		</Grid>
		<footer>
			<Grid>
				<Row>
					<Col className="menu" lg={3}>
						<ul>
							<li><Link to='/'>Home</Link></li>
						</ul>
					</Col>
				</Row>
			</Grid>	
		</footer>
		</React.Fragment>
	</Router>
)


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

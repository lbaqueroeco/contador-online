import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class About extends Component {
    componentDidMount() {}
    render(){
        return (
            <React.Fragment>
                {/*
                <div className="preloader-mask">
		            <div className="preloader"></div>
	            </div> */}
                <section id="hero" className="hero-section bg1 bg-cover window-height light-text">
                    <ul className="socials-nav">
                        <li className="socials-nav-item"><a href="https://twitter.com/ecotropics?lang=es"><span className="fa fa-twitter"></span></a></li>
                        <li className="socials-nav-item"><a href="https://www.facebook.com/groups/6035388653"><span className="fa fa-facebook"></span></a></li>
                        <li className="socials-nav-item"><a href="https://www.instagram.com/ecotropics/?hl=es-la"><span className="fa fa-instagram"></span></a></li>
                    </ul>
                    <div className="heading-block centered-block align-center">
                        <div className="container">
                            <h5 className="heading-alt letratitul estc1">
                            <span className="fa fa-calendar-o base-clr-txt"></span>28.oct 
                            <span className="fa fa-map-marker base-clr-txt estc2"></span>Medellín</h5>
                            <h1 className="letratitul">World Climate Solutions Forum</h1>
                            <h6 className="thin base-font letratitul"><strong>Slogan del foro soluciones climáticas</strong></h6>
                            <div className="btns-container">
                                <a href="./register" className="btn btn-md" data-modal-link="email-ticket">Register</a>
                                <a href="https://www.youtube.com/" className="btn btn-outline btn-md" data-modal-link="0">Video</a>
                                <br/><br/>
                                <NavLink to="/pagina2">Pagina 2 </NavLink>

                            </div>
                        </div>
                    </div>
            	</section>
            </React.Fragment>
        )
    }
}
export default About;
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 

var Global = {
    url: 'http://localhost:4000/api/',
    consg:"Indef",
    autentica:  { 'Authorization': 'Bearer '+ cookies.get("token"),
}
};

export default Global;
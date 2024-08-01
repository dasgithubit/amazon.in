// what is backend
// Another computer that manages the data of the website
// With the help of Internet we send data from one compueter to the another computer
// It uses HTTP message is also called as hyper text transfer protocol
// we send request and we recieve a response
// we have inbuilt class XMLHTTPRequest inside the javascript
// Now we will create a object using this
// The response can be of multiple type: text, html, JSON, image
// we have url path it is also called as API (application programming interface) : interface means to interact with the somwthing

const htr = new XMLHttpRequest();

htr.addEventListener('load', () => {
    console.log(htr.response);
});

htr.open('GET', 'https://supersimplebackend.dev/products/first');
htr.send();



// htr.save is a asynchronous code it does not wait for the code to excute to go to the next line
import React, { useState } from "react";

const Main = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [email, setEmail] = useState("");
    const [problemImage, setProblemImage] = useState("");

    const [isBusy, setIsBusy] = useState(false);
    const [responseStatus, setResponseStatus] = useState("");

    const sendMessage= (e) => {
        e.preventDefault();
        setIsBusy(true); //spinner is showing
        
        const message = new FormData();
        if(problemImage !== "" && title !== "" && body !== "" && email !== ""){
            message.append("title", title);
            message.append("body", body);
            message.append("email", email);
            message.append("image", problemImage[0], problemImage[0]["filename"]);

            const options = {
                method: "post",
                body: message
            }


            fetch("http://localhost:4000/api/mailer", options)
            .then(res => {
                return res.json();
            }).then(res => {
                console.log(res)
                setResponseStatus(res["data"]);
                setTimeout(() => {
                    setIsBusy(false); // kill the spinner
                }, 1000);
                
            }).catch(err => {
                setResponseStatus(err);
                console.log(err);
                setTimeout(() => {
                    setIsBusy(false); // kill the spinner
                }, 1000);
               
            });
      
        }else{
            console.log("You must provide an image of the problem or error");
        }

    }


    let submitButton;
    let loader;
    let responseHandler;


    if(!isBusy){
        submitButton = (<input type="submit" value="Send Email" />);
    }else{
        submitButton = "";
    }


    if(isBusy){
        loader = (<div>
        <div className="lds-dual-ring"></div>
        <p>Sending Email, please wait</p>
        </div>)
    }else{
        loader = "";
    }

    if(responseStatus != ""){
        responseHandler = (<p className="response">{responseStatus}</p>)
        
        setTimeout(() => {
            setResponseStatus("");
        }, 3000);
    }else{
        responseHandler = "";
    }

    



    return(
        <React.Fragment>
            <div className="container">
            <img className="hero" loading="lazy" src="https://images.unsplash.com/photo-1535043205849-513fe27db33e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" />
          
            <header>
                <div>
                    <h1>We will fix your <br/> web issues.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper aliquet enim, vitae gravida erat rutrum ornare. Quisque id vehicula risus. Aenean sit amet aliquam ante, eget lobortis neque. Aenean nibh quam, interdum vitae viverra et, interdum a nisl. Quisque ut dapibus nulla. </p>
                </div>
            </header>



            <form className="create" onSubmit={sendMessage}>
            <h2>Send us an email explaining your issue.</h2>

            <div className="control">
                <label htmlFor="title">Title: </label>
                <input type="text"  name="title" id="title" onChange = {e => setTitle(e.target.value)} />
            </div>

            <div className="control">
                <label htmlFor="description">Body: </label>
                <textarea name="description" id="description" onChange={e => setBody(e.target.value)} ></textarea>
            </div>

            <div className="control">
                <p>Provide your email for us to be able to communicate with you later</p>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
            </div>


            <div className="divider"></div>

                <p>Provide an image of the problem or error</p>                 
            <div className="control">
                <label htmlFor="image">Problem Image: </label>
                <input type="file" name="image" id="image" onChange={e => setProblemImage(e.target.files)} />
            </div>

            {submitButton}
            {loader}
            </form>
            {responseHandler}
            </div>
        </React.Fragment>
    )



}
export default Main;
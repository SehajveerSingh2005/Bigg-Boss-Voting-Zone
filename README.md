Use these 2 colours for the biggbos type theme --> #ffbd23 and #fd7201
Note: Use these 2 colours simultaneously for text highlights and buttons to match the theme

To make a linear gradient text like i used for navbar and for title, paste this in the css

   background: linear-gradient(to right, #ffbd23, #fd7201);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;

To make the linear gradient buttons, use this:
(change the name of the class)
.signout{
        display: inline-block;
        position: relative ;
        text-align: center;
        line-height: 50px;
        color: black;
        text-decoration: none;
        z-index: 9;
        height: 50px;
        width: 100px;
        border-radius: 10px;
        font-size: 20px;
        margin-right: 50px;
        background: linear-gradient(to right, #ffbd23, #fd7201);
      } 
      
      .signout-helper{
        position: absolute;
        height: 50px;
        width: 100px;
        margin-left: -10px;
        z-index: -1;
        border-radius: 10px;
        opacity: 0;
        transition: opacity 0.5s linear;
        background: linear-gradient(to right, #fd7201,#ffbd23);
      }
      .signout:hover .signout-helper{
        opacity: 1;
    }

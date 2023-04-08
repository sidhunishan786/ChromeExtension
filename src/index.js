import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import BarChart from "./BarChart";
import "./index.css"
import PieChart from "./PieChart";
import { elements } from "chart.js";

var json;

var rr=true;

async function codeforcesdata() {
    const id=prompt("user id ");
   
    const data=await fetch("https://codeforces.com/api/user.status?handle="+id);
    if(data.status==="FAILED"){
        rr=false;
    }
    json= await data.json();
    console.log(json);
    
}
var x=[],y=[];
var px=[],py=[];
var piecolors=[
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
];

    
codeforcesdata().then(()=>{
    const m=new Map();
    const problem_set=new Set();
    const m2=new Map();

    const {status,result}=json;
    for (let index = 0; index < result.length; index++) {
        const tags=result[index].problem.tags;
        
        if(result[index].verdict==="OK"  && !problem_set.has(result[index].problem.name)){

            for (let i = 0; i < tags.length; i++) {
                if(m2.get(tags[i])){
 
                    m2.set(tags[i],(m2.get(tags[i]))+1);
                }
                else{
                    m2.set(tags[i],1);
                }
                
            }

          if(m.get(result[index].problem.rating)){
 
            m.set(result[index].problem.rating,m.get(result[index].problem.rating)+1);
        }
        else{
            m.set(result[index].problem.rating,1);
        }
        problem_set.add(result[index].problem.name);

        }
        
    }
    
    for(const [key,value] of m){
        if(key===undefined){
            continue;
        }
        x.push(key);
        y.push(value);
       
  }
  for (const [key,value] of m2){
    //console.log(key,value);
    if(key===undefined){
        continue;
    }
    px.push(key);
    py.push(value);    
}
 

  
const Applayout=()=>{
    
    const [userData,setUserData]=useState({
        labels: x,
        datasets:[
           { 
            label: "",
            data: y,
            backgroundColor:piecolors,
            borderColor: "black",
        }
        ]
    });
    const [userDatap,setUserDatap]=useState({
        labels: px,
        datasets:[
           { 
            label: "",
            data: py,
            backgroundColor:piecolors,
            borderColor: "black",
        }
        ]
    });

    return (
        <div style={{width:'700px'}}>
            <div id="barchart">
            <BarChart chartData={userData}></BarChart>

            </div>

            <div id="piechart">
            <PieChart chartData={userDatap}></PieChart>

            </div>

        </div>
    );
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<Applayout/>)

}).catch(()=>{
    const Er=()=>{
        return (
            <div>
                please enter valid user id
            </div>
        )
    }
    const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<Er/>)
})
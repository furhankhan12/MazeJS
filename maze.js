const fetch = require('isomorphic-fetch')

var API = "https://www.cs.virginia.edu/~dgg6b/jsonMaze/enter.json"

var wURL = "https://www.cs.virginia.edu/~dgg6b/jsonMaze/"

// Properties of maze object
// id
// left
// right
// body
// URLRIGHT
// URLLEFT

function DFS(url){
    let path = ""
    return fetch(url).then(response=>response.json().then(data => ({
        status: response.status,
        body: data
    }))).then((temp) => {
        let maze = temp.body;
        if (maze.exit === true) {
            path += maze.id
            return path
        }
        if (maze.left !== null && maze.left !== undefined){
            return DFS(wURL + maze.left + ".json").then((lresult) => {
                if (lresult !== ""){
                    return path += lresult + "\n" + maze.id
                }
                else{
                    return path
                }
            }).then((resultleft)=>{
                if (maze.right !== null && resultleft.right !== undefined){
                    return DFS(wURL + maze.right + ".json").then((rresult)=>{
                        if (rresult !== ""){
                            return path += rresult + "\n" + maze.id
                        }
                        return path
                    })
                }
            })
        }
            return path
    })
}

DFS(API).then((answer) => {
    console.log(answer)
})
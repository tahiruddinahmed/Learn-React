import { useEffect, useState } from "react"

function FetchDataEffect() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = await response.json()
            
            // update the data in the state
            setPosts(data)
        }
        getPosts()
    }, [])


    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: "2px"
            }}>
            
             <h1>Posts: {posts.length > 0 ? posts.length : 'Loading'}</h1>
                {posts.length > 0 ? posts.map(post => (
                    <div 
                        key={post.id}
                        style={{
                            border: "1px solid gray",
                            padding: "2px 6px",
                            background: "#eceaea",
                            fontFamily: "sans-serif"

                        }}
                    
                    >
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                ))
                : 
                  <p>Loading</p>
                }
            </div>
        </>
    )
}

export default FetchDataEffect
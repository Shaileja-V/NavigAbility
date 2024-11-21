async function getBlogs(){
    const response = await fetch('/get-blogs')
    const data = await response.json();
    // console.log(data.data)
    console.log(data)
    makeBlogs(data)
    // populateBlogs(data.data);   
}

getBlogs();



function makeBlogs(blogs){
    console.log(blogs)
    const summed = [blogs["diet"], blogs["exercises"], blogs["mental-health"], blogs["products"]]
    console.log(summed)
    var barColors = ["#006b57", "#0000ff","#fdd55a", "#663399"];
      var ch = new Chart("cht", {
          type: "pie",
          data: {
              labels: ["Diet", "Exercises", "Mental Health","Products" ],
              datasets: [{
                  fill: false,
                  lineTension: 0,
                  backgroundColor: barColors,
                  borderColor: barColors,
                  borderWidth: 4,
                  data: summed,
              }, ],
          },
  
          options: {
              title: {
                display: true,
                text: `Blogs ratio, Total: ` 
              }
            }
      });
  }
  
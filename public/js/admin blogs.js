
const blogCategories = ['diet', 'exercises', 'products', 'mental-health'];

blogCategories.forEach(async category => {
    // const option = document.createElement('option');
    // option.value = category;
    // option.textContent = category;
    // document.getElementById('category').appendChild(option);

    const response = await fetch('/get-blogs/' + category);

    const data = await response.json();
    console.log(data.data)
    populateCategory(category, data.data);

})


function populateCategory(category, blogs) {
    const table = document.getElementById('blogs-table');

    blogs.forEach(blog => {
        const row = document.createElement('tr');
        const title = document.createElement('td');
        title.textContent = blog.title;

        const author = document.createElement('td');
        author.textContent = blog.name;
        
        const categoryCell = document.createElement('td');
        categoryCell.textContent = category;

        const message = document.createElement('td');
        message.textContent = blog.message;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-outline-dark', 'ms-2')
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteBlog(blog.id, blog.title,category));
        const deleteCell = document.createElement('td');
        deleteCell.appendChild(deleteButton);

        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(categoryCell);
        row.appendChild(message);
        row.appendChild(deleteCell);

        table.appendChild(row);
    });
}

async function deleteBlog(id,title,category){
    const flag = confirm('Are you sure you want to delete ' + title);
    if(!flag){
        return;
    }
    const response = await fetch(`/delete-blog/${category}/${id}`, {method: 'DELETE'});
    const data = await response.json(); 
    console.log(data);
    if(data.success){
        alert('Blog deleted successfully');
        location.reload();  
    }else{
        alert('Error deleting blog');
    }
}
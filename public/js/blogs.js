document.addEventListener("DOMContentLoaded", () => {
    // Get the form element by its ID
    const blogForm = document.getElementById("blog-form");

    if (blogForm) {
        blogForm.addEventListener("submit", (event) => {
            event.preventDefault();

            // Get the input values and check they are not null
            const titleInput = document.getElementById("title");
            const summaryInput = document.getElementById("summary");
            const authorInput = document.getElementById("author");

            if (titleInput && summaryInput && authorInput) {
                const title = titleInput.value;
                const summary = summaryInput.value;
                const author = authorInput.value;

                // Call function to add a new blog post with the input data
                addBlogPost(title, summary, author);

                // Reset the form
                blogForm.reset();
            }
        });
    }
});

/**
 * Adds a new blog post to the blog feed with the given data
 * @param {string} title - The title of the blog post
 * @param {string} summary - The summary of the blog post
 * @param {string} author - The author of the blog post
 */
function addBlogPost(title, summary, author) {
    // Create the new blog post container
    const blogPost = document.createElement("div");
    blogPost.classList.add("blog-post");

    // Add inner HTML structure to match existing styling
    blogPost.innerHTML = `
        <h2>${title}</h2>
        <p class="author">by ${author} - ${new Date().toLocaleDateString()}</p>
        <p class="summary">${summary}</p>
        <a href="#" class="read-more">Read More</a>
        <div class="comments">
            <h3>Comments</h3>
            <textarea placeholder="Leave a comment..."></textarea>
            <button type="button">Submit</button>
        </div>
    `;

    // Append the new blog post to the blog feed
    const blogFeed = document.querySelector(".blog-feed");
    if (blogFeed) {
        blogFeed.appendChild(blogPost);

    }
}

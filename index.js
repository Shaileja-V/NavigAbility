const express = require('express')
const session = require('express-session')
const app = express()
const filestore = require('session-file-store')(session)
const port = 3000
const bodyParser = require('body-parser')
require('dotenv').config();
const { Encrypt, Decrypt } = require('./Security.js')
const { getAuth } = require("firebase/auth");
const { firebase, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, addDoc, collection, getDocs, doc, deleteDoc, setDoc, getDoc } = require('./firebase.js')
const { respondToText } = require('./gemini.js')
const { sendEmail } = require('./Mailing.js')


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebase);

const oneDay = 86400000

// Removes cache
app.use((request, response, next) => {
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    response.setHeader("Pragma", "no-cache");
    response.setHeader("Expires", "0");
    next()
});


// parse application/json
app.use(bodyParser.json())

//session middleware
app.use(session({
    name: process.env.Session_name,
    secret: process.env.Session_secret,
    saveUninitialized: false,
    cookie: { maxAge: oneDay, httpOnly: false },
    resave: false,
    store: new filestore({ logFn: function () { } }),
    path: "./sessions/",
    ttl: oneDay
}));

// Set up session middleware
app.set('views', 'views')
app.set('view engine', 'hbs')
app.use(express.static('public'))

app.get('/', (request, response) => {
    response.render('index')
})

app.get('/login', (request, response) => {
    response.render('LogIn')
})

app.get('/signup', (reequest, response) => {
    response.render('SignIn')
})

app.get('/blogs', (request, response) => {
    response.render('blogs')
})

app.get('/contact', (request, response) => {
    response.render('contact')
})

app.get('/AboutUs', (request, response) => {
    response.render('AboutUs')
})

app.get('/schools', (request, response) => {
    response.render('schools')
})

app.get('/admin', (request, response) => {
    response.render('admin')
})

app.get('/admin-analytics', (request, response) => {
    response.render('Admin Graphs')
})


app.post('/login', (request, response) => {
    const { email, password } = request.body;

    if (email === 'admin@gmail.com' && password === 'admin123') {
        response.cookie('user', 'admin');
        return response.status(200).json({ redirect: '/admin', success: true, message: 'Admin signed in successfully' });
    }
    console.log(email, password)
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in
            var user = userCredential.user;
            request.session.user = user;
            response.cookie('user', 'user')
            return response.status(200).json({ message: 'User signed in successfully', redirect: '/', success: true });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            return response.status(500).json({ message: 'Error signing in', success: false })

        });
})

app.post('/signup', (request, response) => {
    const { name, email, password } = request.body;
    console.log(name, email, password);
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed up 
            const user = userCredential.user;
            const id = user.uid;
            // const docRef = await addDoc(collection(db, "users"), {
            //     email: email,
            //     role: role,
            //     name: name,
            //     id: id
            // });
            const docRef = await setDoc(doc(db, "users", id), {
                email: email,
                role: "parent",
                name: name
            });
            return response.status(200).json({ message: 'User created successfully', success: true })

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            return response.status(500).json({ message: 'Error creating user account', success: false })
            // ..
        });
})

app.post('/add_school', async (request, response) => {
    const { name, location, email, phone, services, website } = request.body;
    console.log(name, location, email, phone)
    const docRef = await addDoc(collection(db, "schools"), {
        email: email,
        location: location,
        name: name,
        phone: phone,
        services: services,
        website: website
    })
        .then(() => {
            return response.status(200).json({ message: 'School added successfully', success: true })
        }).catch((error) => {
            return response.status(500).json({ message: 'Error adding school', success: false })
        })
})

app.get('/get-schools', async (request, response) => {
    const schools = [];
    const querySnapshot = await getDocs(collection(db, "schools"));
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        const newObj = {
            ...doc.data(),
            ID: doc.id
        }
        schools.push(newObj)

        // schools.push(...doc.data(), { id: doc.id });
    });
    return response.status(200).json({ data: schools })
})

// Logout
app.get('/logout', (request, response) => {
    request.session.destroy((err) => {
        if (err) throw err;
        request.session = null;
        response.clearCookie('user')
        response.clearCookie('User_Session')
        response.redirect('/')
    })
})


app.delete('/delete-school/:id', async (request, response) => {
    const { id } = request.params;
    try {
        await deleteDoc(doc(db, "schools", id));
        return response.status(200).json({ message: 'School deleted successfully', success: true })
    } catch (error) {
        return response.status(500).json({ message: 'Error deleting school', success: false })
    }
})

app.post('/chatbot', (request, response) => {
    const { input } = request.body;
    respondToText(input).then((message) => {
        return response.status(200).json({ message, success: true })
    }).catch((error) => {
        return response.status(500).json({ message: 'Error responding to text', success: false })
    })
})

app.post('/add-blog', async (request, response) => {
    const { title, category, message } = request.body;
    const { uid } = request.session.user;
    try {
        // await setDoc(doc(db, "blogs", category), {
        //     title: title,
        //     user: uid,
        //     message: message
        //   });
        const docRef = await addDoc(collection(db, category), {
            title: title,
            user: uid,
            message: message,
            name: await getUserName(uid)
            // category: category
        });
        return response.status(200).json({ message: 'Blog added successfully', success: true })

    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: 'Error adding blog', success: false })

    }
})


async function getUserName(id) {
    console.log(id)

    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    // const docRef = doc(db, "users", id);
    // const docSnap = getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().name;
    }
    return 'Unknown';
}

app.get('/add-blogs', (request, response) => {
    response.render('Add Blogs')
})

app.get('/get-blogs/:category', async (request, response) => {
    const { category } = request.params;
    const blogs = [];
    const querySnapshot = await getDocs(collection(db, category));
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        blogs.push({ ...doc.data(), id: doc.id });
    });
    return response.status(200).json({ data: blogs })
})

app.post('/contact', async (request, response) => {
    const { name, email, message, subject } = request.body;
    console.log(name, email, message, subject)

    try {
        await sendEmail({ subject: subject, text: message, senderName: name, senderEmail: email })
        return response.status(200).json({ message: 'Email sent successfully', success: true })
    } catch (error) {
        return response.status(500).json({ message: 'Error sending email', success: false })

    }

})

app.get('/admin-blogs', (request, response) => {
    response.render('Admin Blogs')
})

app.delete('/delete-blog/:category/:id', async (request, response) => {
    const { category, id } = request.params;
    console.log(category, id)
    try {
        await deleteDoc(doc(db, category, id));
        return response.status(200).json({ message: 'Blog deleted successfully', success: true })
    } catch (error) {
        return response.status(500).json({ message: 'Error deleting blog', success: false })
    }
})


app.get('/get-blogs', async (request, response) => {
    const blogCategories = ['diet', 'exercises', 'products', 'mental-health'];
    // Get the blog counts for each
    const blogCounts = {};

    // blogCategories.forEach(async category => {
    //     const querySnapshot = await getDocs(collection(db, category));
    //     console.log(querySnapshot.size)
    //     blogCounts[category] = querySnapshot.size;
    // });
    // console.log(blogCounts)
    // blogCategories.forEach(async element => {
    //     blogCounts[element] = await getCategorySize(element);
    //     // console.log(element, blogCounts[element])
    //     // return response.status(200).json({ data: blogCounts })
        
    // });

    // for await (const [key, value] of Object.entries(blogCounts)) {
    //     console.log(key, value)
    // }
    for await (const category of blogCategories) {
        blogCounts[category] = await getCategorySize(category);
    }

    return response.status(200).json(blogCounts)
})


async function getCategorySize(category){
    const querySnapshot = await getDocs(collection(db, category));
    return querySnapshot.size;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
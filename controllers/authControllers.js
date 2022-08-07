const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

module.exports.signup = (req,res) => {
    const { name, email, password, role } = req.body;
    console.log(req.body);

    if(!name || !email || !password || !role){
        res.status(400).json({msg: 'Please enter all fields'});
    }

    User.findOne({email})
    .then(user => {
        if(user) return res.status(400).json({msg: 'User already exists'});

        const newUser = new User({ name, email, password, role });

        // Create salt and hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        jwt.sign(
                            { id: user._id },
                            config.get('jwtsecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email,
                                        role: user.role
                                    }
                                });
                            }
                        )
                    });
            })
        })
    })
};

module.exports.login = async (req,res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400).json({msg: 'Please enter all fields'});
    }
    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({msg: 'User does not exist'});

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});

                    jwt.sign(
                        {...user},
                        config.get('jwtsecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            const expires = new Date();
                            expires.setSeconds(expires.getSeconds() + 3600);
                            res.cookie('jwt',token,{expires});
                            res.json({
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email,
                                    role: user.role
                                }
                            });
                        }
                    )
                })
        })
};

module.exports.get_user = (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
};

module.exports.logout = (req,res) => {
    const cookie = req.cookies['jwt'];
    if(!cookie){
        console.log('cookiee')
        res.status(401).json({msg:"Unauthorized"});
    }
    const auth = jwt.verify(cookie, config.get('jwtsecret'));
    if(!auth){
        console.log('auth')
        res.status(401).json({msg:"Unauthorized"});
    }
    res.cookie("jwt", "", {    
        expires: new Date(0),
    });
    res.end();
};

const getAuth = async (req,res) => {
    console.log("helooo")
    const cookie = req.cookies['jwt'];
    if (!cookie) {
        res.status(401).json({msg:"Unauthorized"});
        return;
    }
    const auth = jwt.verify(cookie, config.get("jwtsecret"));
    if (!auth) {
        res.status(401).json({msg:"Unauthorized"});
        return;
    }
    return auth._doc;
}

module.exports.check = async (req, res) => {
    const auth = await getAuth(req,res);
    res.json(auth);
}
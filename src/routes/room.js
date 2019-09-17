const express = require('express');
const Room = require('../models/room');
const auth = require('../middleware/auth');
const router = new express.Router();
const date = require('date-and-time'); //pra mexer com os horarios dos agendamento
const timeZoneConverter = require('../middleware/timeZoneConverter');

//creates a room booking to the specific user
router.post('/rooms', auth, async (req, res) => {
    const room = new Room({
        ...req.body, //copy all info from the object
        owner: req.user._id
    })

    // descobre o horario do checkout levando em conta a duracao
    room.checkout = date.addHours(room.checkin, room.duration)

    const localTimeZone = timeZoneConverter(room.checkout)
    console.log(localTimeZone);

    try {
        res.status(201).send(room);
        await room.save();
    } catch (e) {
        res.status(400).send(e);
    }
});

// retorna o usuario que agendou a sala
router.get('/rooms/:id', auth, async (req, res) => { //com o id da sala
    const _id = req.params.id;

    try {
        const room = await Room.findOne({ _id, owner: req.user._id }) // req.user._id from the auth user
        await room.save();
        if (!room) {
            return res.status(404).send();
        }
        res.send(room);
    } catch (e) {
        res.status(500).send();
    }
})

//retorna as salas que foram agendadas pelo usuario
router.get('/rooms', auth, async (req, res) => {

    try {
        const rooms = await Room.find({ owner: req.user._id });
        res.status(201).send(rooms);
    } catch (e) {
        res.status(500).send();
    }
});

// rota pra voltar as salas disponiveis
router.get('/roomsTodaysBooking', auth, async (req, res) => {

    const currentDate = new Date();

    //mes 12 vai zuar pq 'today' volta o numero do mes sem o 0 na frente e no db tem o 0 na frente (com essa funcao nao)
    const checkMonth = (req, res) => {
        if (currentDate.getMonth() < 10) {
            const today = currentDate.getFullYear() + "-0" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate()// + "T00:00:00.000Z"; //getMonth = Jan é 0 e nao 1
            return today;
        } else {
            const today = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate()// + "T00:00:00.000Z"; //getMonth = Jan é 0 e nao 1
            return today;
        }
    }

    const today = checkMonth()
    try {
        const rooms = await Room.find({ date: today });
        res.send(rooms)
    } catch (e) {
        res.status(500).send()
    }
});


// // GET /rooms?completed=false
// // GET /rooms?limit=10&skip=0
// // GET /rooms?sortBy=createdAt:desc
// router.get('/rooms', auth, async (req, res) => {
//     const match = {}
//     const sort = {}

//     if (req.query.completed) {
//         match.completed = req.query.completed === 'true'
//     }

//     if (req.query.sortBy) {
//         const parts = req.query.sortBy.split(':');
//         sort[parts[0]] = parts[1] === 'desc'? -1 : 1 // -1 if true 1 if false (terniary operator)
//     }

//     try {
//         // const rooms = await Room.find({ owner: req.user._id });

//         await req.user.populate({
//             path: 'rooms',
//             match,
//             options: {
//                 limit: parseInt(req.query.limit),
//                 skip: parseInt(req.query.skip), // has to provide a number
//                 sort
//             }
//         }).execPopulate()
//         res.status(201).send(req.user.rooms);
//     } catch (e) {
//         res.status(500).send();
//     }
// });

// router.get('/rooms/:id', auth, async (req, res) => {
//     const _id = req.params.id;

//     try {
//         const room = await Room.findOne({ _id, owner: req.user._id }) // req.user._id from the auth user

//         await room.save();

//         if (!room) {
//             return res.status(404).send();
//         }

//         res.send(room);
//     } catch (e) {
//         res.status(500).send();
//     }
// })

// router.delete('/rooms/:id', auth, async (req, res) => {
//     try {
//         const room = await Room.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

//         if (!room) {
//             return res.status(404).send();
//         }

//         res.send(room);
//     } catch (e) {
//         res.status(500).send();
//     }
// })

// router.patch('/rooms/:id', auth, async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ['completed', 'description'];
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' });
//     }

//     try {
//         const room = await room.findOne({ _id: req.params.id, owner: req.user._id })


//         if (!room) {
//             return res.status(404).send();
//         }

//         updates.forEach((update) => room[update] = req.body[update]);
//         await room.save();
//         res.send(room);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// })

module.exports = router;
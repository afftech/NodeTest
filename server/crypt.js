// getting-started.js
const mongoose = require('mongoose');
async function main() {
    await mongoose.connect('mongodb://localhost:27017/MongoDB');
    const kittySchema = new mongoose.Schema({
        name: String
    });

    const Kitten = mongoose.model('Kitten', kittySchema);

    /*kittySchema.methods.speak = function speak() {
        const greeting = this.name
          ? "Meow name is " + this.name
          : "I don't have a name";
        console.log(greeting);
      };*/


    /*const silence = new Kitten({ name: 'Silence' });
    console.log(silence.name); // 'Silence'*/

    //const del = mongoose.deleteModel('Kitten');

    //fluffy.speak(); // "Meow name is fluffy"
    const fluffy = new Kitten({ name: 'flieue' });

    async function sa() {
        await fluffy.save();
    }

    async function fi() {
        const kittens = await (Kitten.find());
        console.log(kittens);
    }
    /*async function del() {
        const kittens = await (Kitten.find());
        console.log(kittens);
    }*/
   

    async function doc() {
        const d = await ((Kitten.findOneAndDelete("637d3a96026908e826ea2027")));
        console.log(d)
        console.log("Удалил!!!!!")
    };
    doc();
    //sa();
    fi();
    
    
}

main().catch(err => console.log(err));


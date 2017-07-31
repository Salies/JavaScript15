const musicians = [
    {
        name: "Tony Levin",
        role: "bassist",
        born: "June 6, 1946",
        died: null
    },
    {
        name: "John Ro Myung",
        role: "bassist",
        born: "January 24, 1967",
        died: null
    },
    {
        name: "Gregory Stuart Lake",
        role: "bassist",
        born: "10 November 1947",
        died: "7 December 2016"
    },
    {
        name: "Christopher Tony Wolstenholme",
        role: "bassist",
        born: "2 December 1978",
        died: null
    },
    {
        name: "David Warren Ellefson",
        role: "bassist",
        born: "November 12, 1964",
        died: null,
        rocks: ""
    },
];

console.log("Here's a list of musicians.");

for(i=0;i<musicians.length;i++){
    var name = musicians[i].name;
    var role = musicians[i].role;
    
    var rip = musicians[i].died;
    var bornYear = new Date(musicians[i].born).getFullYear();

    if(rip!==null){
        var year = new Date(rip).getFullYear();
        var say = [" was a ", ". He died at the age of ", "."];
    }
    else{
        var year = new Date().getFullYear();
        var say = [" is a ", ". He is ", " years old!"]
    }

    var age = year - bornYear;

    var display = name + say[0] + role + say[1] + age + say[2];

    console.log(display);
}

const check = musicians.every(musician => musician.role == "bassist");
if(check===true){
    console.log("All of these musicians are bassists!");
}

const passed = musicians.some(musician => musician.died);

if(passed===true){
    console.log("At least one of these guys passed away. R.I.P.")
}

const index = musicians.findIndex(musician => musician.name == "David Warren Ellefson");
musicians[index].rocks="Megadeth, yeah!"
console.log(musicians[index].rocks);
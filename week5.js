/*
        This code's objective is to create a menu which
        allows the user to create lists of songs for any
        individual so that individual can add songs to 
        their respective list of favorites.
*/




class Song {  //this class is for creating songs to store in user list
    constructor(name, artist){ 
        this.name = name;
        this.artist = artist;
        this.fullName = name + ' by ' + artist; //used for interface display purposes 
    }
}

class List {
    constructor(name){      //creates list with input of name of list creator
        this.name = name;
        this.songList = []; //initializes list array to store songs
    }

    display() {
        return `${songList}`; //literally has no use but too scared to delete it
    }
}

class Menu {
    constructor() {
        this.lists = []; //initializes array for holding all the user lists
        this.currentList = null; //represents currently selected list
    }

    init() {
        let choice = this.options(); //assigns user choice to variable for menu navigation
                                        //after displaying menu to them
        
        while (choice != 0) {   //decides which option to run based on user input
            switch (choice) {
                case '1':
                    this.createList(); //creates new user list
                    break;
                case '2':
                    this.viewLists(); //views all lists 
                    break;
                case '3':
                    this.editList(); //prompts user which list to edit
                    break;
                case '4':
                    this.deleteList(); //prompts user which list to delete
                    break;  //i've considered putting this functionality in list edit instead
                default:
                    choice = 0;    
            }
            
            if (choice != 0) { //simplest way i found to exit loop from any user input 
                choice = this.options(); //other than 1-4
            }
        }
        
        alert('Thanks for Running Me!'); //polite, immersive, innovative goodbye message that
    }                                       //creates excellent user experience (sarcasm)

    options() { //prompts menu and returns user input
        return prompt(`
           1: Create new list
           2: View created lists
           3: Edit/View created list
           4: Delete list
           
           0: Exit
        `)
    }

    listOptions(displayList) { //displays submenu for single list management, returns user choice
        let list = this.listify();
        return prompt(`
           1: Add song
           2: Delete Song
           3: Return` + '\n' + '\n' + displayList + list)
    }

    createList() {
        let name = prompt('Who is this list for?:'); //method for creating lists
        this.lists.push(new List(name));
    }

    viewLists() { //used to just display all current lists, and return to previous menu
        let listDisplay = '';
        for (let i = 0; i < this.lists.length; i++) {
            listDisplay += this.lists[i].name + '\n';
        }
        
        alert(listDisplay); //used to show popup that gives u all the current lists
    }

    editList() {
        let listList = this.listListify(); 
        let index = prompt(`${listList}\nWhich list do you want to view?:`); 
        if (index > -1 && index <= this.lists.length) {   //checks if user input corresponds with 
            this.currentList = this.lists[index];           //an indexed list in lists array
            let display = 'List Owner: ' + this.currentList.name + '\n';
        
            let choice = this.listOptions(display);  //assigns user input to variable 'choice'
            while (choice != 0) {  //loops menu until choice = 0 through repeated user input
                switch (choice) {
                    case '1':
                        this.addSong();
                        break;
                    case '2':
                        this.deleteSong();
                        break;
                    case 'ohio':
                        this.convertToOhio();
                        break;
                    default:
                        choice = 0;    
                }
                
                if (choice != 0) {  //makes it so if user inputs anything besides 1, 2, or ohio 
                    choice = this.listOptions(display); //it will return to previous menu
                }
                }
        }
    }

    deleteList() {
        let listList = this.listListify(); //uses listListify method to display lists for user selection
        let index = prompt(`${listList}\nWhich list do you want to delete?:`);
        if (index > -1 && index <= this.lists.length) {
            this.lists.splice(index, 1); //checks to see if input matches any indexed list
        }
    }

    addSong() { //method that when ran creates a song from user input of song name and artist
        let name = prompt('Enter song name: '); 
        let artist = prompt('Enter artist name: ');
        let song = new Song(name, artist);
        this.currentList.songList.push(song); //adds song to current list 
    }

    deleteSong() { //this method removes an indexed song from the current list
        let songList = this.listify();
        let song = prompt(`${songList}\nWhich song do you want to remove?: `)
        if (song > -1 && song <= this.currentList.songList.length) {
            this.currentList.songList.splice(song, 1);
        }
    }

    listify() { //i was using this same for loop multiple times so i made it a method
        let display = '\n'; //this method creates a list of songs for any current list
        for (let i = 0; i < this.currentList.songList.length; i++) {
            display += i + ': ' + this.currentList.songList[i].fullName + '\n';
        }
        return display;
    }

    listListify() { //this is similar to listify but for displaying all lists 
        let display = '\n';
        for (let i = 0; i < this.lists.length; i++) {
            display += i + ': ' + this.lists[i].name + '\n';
        }
        return display;
    }

    convertToOhio() { //converts every song in currently selected list to 'ohio is for lovers' by hawthorne heights
        for (let i = 0; i < this.currentList.songList.length; i++) {
            this.currentList.songList[i].name = 'ohio is for lovers';
            this.currentList.songList[i].artist = 'hawthorne heights';
            this.currentList.songList[i].fullName = `ohio is for lovers by hawthorne heights`;
        }
    }
}


let menu = new Menu(); //creates new menu object
menu.init(); //initializes the menu 
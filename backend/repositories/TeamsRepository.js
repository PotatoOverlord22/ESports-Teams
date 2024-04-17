class TeamsRepository {
    constructor(){
        this.teams = [];
    }
    getAllData() {
        return this.teams;
    }
    setData(newTeams){
        this.teams = newTeams;
    }
}



module.exports = TeamsRepository;
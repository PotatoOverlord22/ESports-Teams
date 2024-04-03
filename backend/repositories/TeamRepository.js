class TeamRepository {
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



module.exports = TeamRepository;
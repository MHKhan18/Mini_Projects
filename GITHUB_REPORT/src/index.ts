
import { GitHubAPIService } from "./GitHubAPIService";
import { User } from "./User";
import { Repo } from "./Repo";
import * as _ from 'lodash';


let svc = new GitHubAPIService();
if (process.argv.length < 3){
    console.log('Usage: npm start <username>');
}
else{
    let username = process.argv[2];
    const user:Promise<User> = svc.getUserInfo(username);
    const repos:Promise<Repo[]> = svc.getRepos(username);
    Promise.all([user , repos])
    .then(
        ([user , repos]) => {
            let sortedRepos = _.sortBy(repos, [(repo: Repo) => repo.size * -1]);
            let filteredRepos = sortedRepos.slice(0,5);
            user.repos = filteredRepos;
            console.log(user);
        }
    )
    .catch( error => {
        console.log(error);
    })

}
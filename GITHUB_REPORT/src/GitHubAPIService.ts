
import * as request from 'request';
import {User} from './User';
import {Repo} from './Repo';
import { reject } from 'lodash';
import { resolve } from 'path';

const OPTIONS: any = {
    headers: {
        'User-Agent' : 'request'
    },
    json: true
};

export class GitHubAPIService{

    getUserInfo(userName: string): Promise<User>{

        return new Promise( (resolve:any , reject:any) => {
            request.get(`https://api.github.com/users/${userName}`,
                        OPTIONS, 
                        (error: any , reponse:any, body:any)=>{
                            if (error){
                                reject(error);
                            }
                            else{
                                let user:User = new User(body);
                                resolve(user);
                            }
                        });
                    })
                }

    getRepos(userName: string):Promise<Repo[]>{

        return new Promise( (resolve:any , reject: any) => {
            request.get(`https://api.github.com/users/${userName}/repos`,
                    OPTIONS, 
                    (error: any , reponse:any, body:any) => {
                        if (error){
                            reject(error);
                        }
                        else{
                            let repos: Repo[] = body.map((repo: any) => new Repo(repo));
                            resolve(repos);
                        }
                    });
            })
        }
    }
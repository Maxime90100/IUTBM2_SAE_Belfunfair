import {pool} from "./../db.js"
import {deleteFromGoldenBook} from "../controllers/users.controller.js";

export default class UsersService {

    async getUsers(){
        return new Promise((resolve,reject)=>{
            pool.query('select * from users order by id ASC;', (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getEmplacements(type){
        return new Promise((resolve,reject)=>{
            pool.query('select emplacements'+type+'.id as id_emplacement, '+type+'.id, '+type+'.name as name, cast('+type+'Inscrit.dateDebut as varchar), cast('+type+'Inscrit.dateFin as varchar), '+type+'Inscrit.cancel from emplacements'+type+' left join '+type+'Inscrit on emplacements'+type+'.id = '+type+'Inscrit.id_emplacement left join '+type+' on '+type+'.id = '+type+'Inscrit.id_'+type.substring(0,type.length - 1)+' order by emplacements'+type+'.id ASC;', (error,result)=>{
               if(error){
                   console.error(error)
                   reject(error)
               }
               resolve(result.rows)
           });
        });
    }

    async getTypesManege(){
        return new Promise((resolve, reject)=>{
            pool.query('select * from types_manege;', (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getTypesStand(){
        return new Promise((resolve, reject)=>{
            pool.query('select * from types_stand;', (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getTypesArtist(){
        return new Promise((resolve, reject)=>{
            pool.query('select * from types_artiste;', (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }

    async getInProgressManifestation(){
        return new Promise((resolve, reject) => {
            pool.query('select id, cast(dateDebut as TEXT), cast(dateFin as TEXT), inProgress from manifestations where inProgress=true;', (error, result) => {
                if (error) {
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }

    // MANEGES

    async getManeges(){
        return new Promise((resolve,reject)=>{
            pool.query('select m.id, m.id_user, m.name, t.libelle as type, m.taille_min, m.description, m.images, m.status, AVG(n.note) as note from maneges m join types_manege t on m.type = t.id left join notesManege n on m.id = n.id_manege group by m.id, t.libelle order by m.id ASC;', (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getManegesByIdUser(id_user){
        return new Promise((resolve,reject)=>{
            pool.query('select m.id, m.id_user, m.name, t.libelle as type, m.taille_min, m.description, m.images, m.status, cast(mi.datedebut as TEXT), cast(mi.datefin as TEXT), mi.id_emplacement, mi.id_manifestation, mi.cancel from maneges m join types_manege t on m.type = t.id left join manegesInscrit mi on m.id = mi.id_manege where m.id_user=$1 order by m.id ASC;', [id_user], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getManegeById(id){
        return new Promise((resolve,reject)=>{
            pool.query('select m.id, m.id_user, m.name, m.type, t.libelle as typeLibelle, m.taille_min, m.description, m.images, m.status from maneges m join types_manege t on m.type = t.id where m.id=$1;', [id], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows[0])
            });
        });
    }
    async getManegesStartWith(start){
        return new Promise((resolve,reject)=>{
            pool.query('select * from maneges where name like $1;', [start+"%"], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }

    // STANDS

    async getStands(){
        return new Promise((resolve,reject)=>{
            pool.query('select s.id, s.id_user, s.name, t.libelle as type, s.description, s.images, s.status, AVG(n.note) as note from stands s join types_stand t on s.type = t.id left join notesStand n on s.id = n.id_stand group by s.id, t.libelle order by s.id ASC;', (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getStandsByIdUser(id_user){
        return new Promise((resolve,reject)=>{
            pool.query('select s.id, s.id_user, s.name, t.libelle as type, s.description, s.images, s.status, cast(si.datedebut as TEXT), cast(si.datefin as TEXT), si.id_emplacement, si.id_manifestation, si.cancel from stands s join types_stand t on s.type = t.id left join standsInscrit si on s.id = si.id_stand where id_user=$1 order by id ASC;', [id_user], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getStandById(id){
        return new Promise((resolve,reject)=>{
            pool.query('select s.id, s.id_user, s.name, s.type, t.libelle as typeLibelle, s.description, s.images, s.status from stands s join types_stand t on s.type = t.id where s.id=$1;', [id], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows[0])
            });
        });
    }
    async getStandsStartWith(start){
        return new Promise((resolve,reject)=>{
            pool.query('select * from stands  where name like $1;', [start+"%"], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }

    // SCENE

    async getArtists(){
        return new Promise((resolve,reject)=>{
            pool.query('select a.id, a.id_user, a.name, t.libelle as type, a.description, a.images, a.groupe, a.status, AVG(n.note) as note from artistes a join types_artiste t on a.type = t.id left join notesArtiste n on a.id = n.id_artiste group by a.id, t.libelle order by a.id ASC;', (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getArtistsInscrits(){
        return new Promise((resolve,reject)=>{
            pool.query('select a.id, a.id_manifestation, a.id_artiste, CAST(a.date as TEXT), a.starthour, a.endhour from artistesinscrit a;', (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getArtistsByIdUser(id_user){
        return new Promise((resolve,reject)=>{
            pool.query('select a.id, a.id_user, a.name, t.libelle as type, a.description, a.images, a.groupe, a.status, cast(ai.date as TEXT), ai.starthour, ai.endhour, ai.id_manifestation, ai.cancel from artistes a join types_artiste t on a.type = t.id left join artistesinscrit ai on a.id = ai.id_artiste where id_user=$1 order by id ASC;', [id_user], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getArtistById(id){
        return new Promise((resolve,reject)=>{
            pool.query('select a.id, a.id_user, a.name, a.type, t.libelle as typeLibelle, a.description, a.images, a.groupe, a.status, cast(ai.date as TEXT), ai.starthour, ai.endhour, ai.cancel from artistes a join types_artiste t on a.type = t.id left join artistesinscrit ai on a.id = ai.id_artiste where a.id=$1;', [id], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows[0])
            });
        });
    }
    async getArtistsStartWith(start){
        return new Promise((resolve,reject)=>{
            pool.query('select * from artistes  where name like $1;', [start+"%"], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }


    async getNotes(id_user){
        let params = []
        if(id_user) params.push(id_user)
        return new Promise((resolve,reject)=>{
            let notesManege, notesStand, notesArtiste, query
            query = 'select * from notesManege;'
            if(id_user) query = 'select * from notesManege where id_user = $1;'
            pool.query(query, params, (error,result)=>{
                if(error) reject(error)
                notesManege = result.rows
                query = 'select * from notesStand;'
                if(id_user) query = 'select * from notesStand where id_user = $1;'
                pool.query(query, params, (error,result)=>{
                    if(error) reject(error)
                    notesStand = result.rows
                    query = 'select * from notesArtiste;'
                    if(id_user) query = 'select * from notesArtiste where id_user = $1;'
                    pool.query(query, params, (error,result)=>{
                        if(error) reject(error)
                        notesArtiste = result.rows
                        resolve({notesManege:notesManege,notesStand:notesStand,notesArtiste:notesArtiste})
                    });
                });
            });
        });
    }
    async setNote(id_user,type,id,note){
        let select, insert, update
        if(type === 'manege'){
            select = 'select * from notesManege where id_user = $1 and id_manege = $2;'
            insert = 'insert into notesManege(note,id_user,id_manege) values ($1,$2,$3);'
            update = 'update notesManege set note=$1 where id_user=$2 and id_manege=$3;'
        }
        if(type === 'stand'){
            select = 'select * from notesStand where id_user = $1 and id_stand = $2;'
            insert = 'insert into notesStand(note,id_user,id_stand) values ($1,$2,$3);'
            update = 'update notesStand set note=$1 where id_user=$2 and id_stand=$3;'
        }
        if(type === 'artiste'){
            select = 'select * from notesArtiste where id_user = $1 and id_artiste = $2;'
            insert = 'insert into notesArtiste(note,id_user,id_artiste) values ($1,$2,$3);'
            update = 'update notesArtiste set note=$1 where id_user=$2 and id_artiste=$3;'
        }
        return new Promise((resolve,reject)=>{
            pool.query(select,[id_user,id], (err,res)=>{
                if(err) reject(err)
                let query
                if(res.rows.length>0) query = update
                else query = insert
                pool.query(query, [note,id_user,id], (error,result)=>{
                    if(error) reject(error)
                    resolve("Note ajoutée !")
                });
            })
        });
    }

    async getLike(id_user){
        let params = []
        if(id_user) params.push(id_user)
        return new Promise((resolve,reject)=>{
            let likeListManege, likeListStand, likeListArtiste, query
            query = id_user ? 'select * from likeListManege where id_user = $1;' : 'select * from likeListManege;'
            pool.query(query, params, (error,result)=>{
                if(error) reject(error)
                likeListManege = result.rows
                query = id_user ? 'select * from likeListStand where id_user = $1;' : 'select * from likeListStand;'
                pool.query(query, params, (error,result)=>{
                    if(error) reject(error)
                    likeListStand = result.rows
                    query = id_user ? 'select * from likeListArtiste where id_user = $1;' : 'select * from likeListArtiste;'
                    pool.query(query, params, (error,result)=>{
                        if(error) reject(error)
                        likeListArtiste = result.rows
                        resolve({likeListManege:likeListManege,likeListStand:likeListStand,likeListArtiste:likeListArtiste})
                    });
                });
            });
        });
    }
    async setLike(id_user,type,id,bool){
        let query
        if(type === 'manege')
            query = bool === "true" ? 'insert into likeListManege(id_user,id_manege) values ($1,$2);' : 'delete from likeListManege where id_user=$1 and id_manege=$2;'
        if(type === 'stand')
            query = bool === "true" ? 'insert into likeListStand(id_user,id_stand) values ($1,$2);' : 'delete from likeListStand where id_user=$1 and id_stand=$2;'
        if(type === 'artiste')
            query = bool === "true" ? 'insert into likeListArtiste(id_user,id_artiste) values ($1,$2);' : 'delete from likeListArtiste where id_user=$1 and id_artiste=$2;'
        return new Promise((resolve,reject)=>{
            pool.query(query,[id_user,id], (err,res)=>{
                if(err) reject(err)
                resolve("Votre likeList à bien été mise à jour !")
            })
        });
    }

    async getGoldenBook(){
        return new Promise((resolve,reject)=>{
            pool.query('select * from goldenBook order by id DESC;',(err,res)=>{
                if(err) reject(err)
                resolve(res.rows)
            })
        })
    }

    async addToGoldenBook(id_user,comment,header){
        return new Promise((resolve,reject)=>{
            pool.query('insert into goldenBook(id_user,header,comment) values ($1,$2,$3);', [id_user,header,comment], (err,res)=>{
                if(err) reject(err)
                resolve("Votre commentaire à bien été ajouté !")
            })
        })
    }

    async deleteFromGoldenBook(id){
        return new Promise((resolve,reject)=>{
            pool.query('delete from goldenBook where id=$1;', [id], (err,res)=>{
                if(err) reject(err)
                resolve("Votre commentaire à bien été supprimé !")
            })
        })
    }











    // STAFF

    async getStaffById(id){
        return new Promise((resolve,reject)=>{
            pool.query('select * from staff where id=$1;', [id], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows[0])
            });
        });
    }

    async getStaffByIdUser(id_user){
        return new Promise((resolve,reject)=>{
            pool.query('select * from staff where id_user=$1 order by id ASC;', [id_user], (error,result)=>{
                if(error){
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
}
import {pool} from "./../db.js"

export default class PublicService {

    async getManegesMap() {
        return new Promise((resolve, reject) => {
            pool.query('select m.id, m.id_user, m.name, t.libelle as type, m.taille_min, m.description, m.images, m.status, cast(mi.dateDebut as TEXT), cast(mi.dateFin as TEXT), mi.id_emplacement from maneges m join types_manege t on m.type = t.id join manegesInscrit mi on m.id = mi.id where status = $1;', ['attributed'], (error, result) => {
                if (error) {
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getStandsMap() {
        return new Promise((resolve, reject) => {
            pool.query('select s.id, s.id_user, s.name, s.description, s.images, s.status, cast(si.dateDebut as TEXT), cast(si.dateFin as TEXT), si.id_emplacement from stands s join standsInscrit si on s.id = si.id where status = $1;', ['attributed'], (error, result) => {
                if (error) {
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
}
import {pool} from "./../db.js"

export default class PublicService {

    async getManegesMap() {
        return new Promise((resolve, reject) => {
            pool.query('select m.id, m.id_user, m.name, t.libelle as type, m.taille_min, m.description, m.images, m.status, AVG(n.note) as note, cast(mi.dateDebut as TEXT), cast(mi.dateFin as TEXT), mi.id_emplacement from maneges m join types_manege t on m.type = t.id left join manegesInscrit mi on m.id = mi.id left join notesManege n on m.id=n.id_manege where status = $1 group by m.id, t.libelle, mi.dateDebut, mi.dateFin, mi.id_emplacement;', ['attributed'], (error, result) => {
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
            pool.query('select s.id, s.id_user, s.name, t.libelle as type, s.description, s.images, s.status, AVG(n.note) as note, cast(si.dateDebut as TEXT), cast(si.dateFin as TEXT), si.id_emplacement from stands s join types_stand t on s.type = t.id left join standsInscrit si on s.id = si.id left join notesStand n on s.id=n.id_stand where status = $1 group by s.id, t.libelle, si.dateDebut, si.dateFin, si.id_emplacement;', ['attributed'], (error, result) => {
                if (error) {
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
    async getArtistesMap() {
        return new Promise((resolve, reject) => {
            pool.query('select a.id, a.id_user, a.name, t.libelle as type, a.description, a.images, a.status, AVG(n.note) as note, cast(ai.date as TEXT), ai.starthour, ai.endhour from artistes a join types_artiste t on a.type = t.id left join artistesinscrit ai on a.id = ai.id_artiste left join notesArtiste n on a.id=n.id_artiste where status = $1 group by a.id, t.libelle, ai.date, ai.starthour, ai.endhour;', ['attributed'], (error, result) => {
                if (error) {
                    console.error(error)
                    reject(error)
                }
                resolve(result.rows)
            });
        });
    }
}
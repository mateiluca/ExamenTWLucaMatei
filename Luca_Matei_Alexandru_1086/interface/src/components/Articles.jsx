import { useEffect, useState } from "react";
import ArticlesList from "./ArticlesList";
import ReferencesList from "./ReferencesList";

export const Article = () => {
    const [articles, setArticles] = useState([]);
    const [article, setArticle] = useState({
        id: -1,
        titlu: "",
        rezumat: "",
      });
      const [titlu, setTitlu] = useState("");
      const [rezumat, setRezumat] = useState("");
      const [references, setReferences] = useState([]);
    

    useEffect(() => {
        handleGet();
      }, []);

    const handleAdd = (e) => {
        e.preventDefault();

    const titlu = e.target.titlu.value;
    const rezumat = e.target.rezumat.value;

    if (titlu.length > 5 && rezumat.length > 10) {
      const req = `http://localhost:8080/article`;
      fetch(req, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          titlu:titlu,
          rezumat:rezumat
        }),
      }).then((response) => {
        if (response.status === 200) {
            handleGet()
          console.log("Candidate was inserted");
        } else if (response.status === 500) {
          console.log("Candidate was not inserted");
        }
      });
    }
    }

    const handleGet = () => {
        const req = `http://localhost:8080/article`;
        fetch(req).then((response) => {
          if (response.status === 200) {
            response.json().then((json) => {
              setArticles(json);
            });
          } else {
            setArticles([]);
          }
        });
      };

      const handleGetReferences = (id) => {
        const req = `http://localhost:8080/reference/article/${id}`;
        fetch(req).then((response) => {
          if (response.status === 200) {
            response.json().then((json) => {
              setReferences(json);
            });
          } else {
            setReferences([]);
          }
        });
      };

      const getArticle = (id) => {
        const req = `http://localhost:8080/article/${id}`;
    fetch(req).then((response) => {
        console.log(response);
      if (response.status === 200) {
        response.json().then((json) => {
          setArticle(json);
          setTitlu(json.titlu);
          setRezumat(json.rezumat);
        });
      }
    });
      }

      const handleEdit = (e) => {
        const titlu = e.target.titlu.value;
        const rezumat = e.target.rezumat.value;
    
        const req = `http://localhost:8080/article/${article.id}/`;
        fetch(req, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            titlu: titlu,
            rezumat: rezumat,
          }),
        }).then((response) => {
          if (response.status === 200) {
            console.log("Candidate was modified");
            handleGet();
          } else if (response.status === 500) {
            console.log("Candidate was not modified");
          }
        });
      };

      const handleDelete = (id) => {
        const req = `http://localhost:8080/article/${id}/`;
        fetch(req, {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }).then((response) => {
          console.log(response);
          if (response.status === 200) {
            handleGet();
            console.log("Candidate was deleted");
          } else if (response.status === 500) {
            console.log("Candidate was not deleted");
          }
        });
      };

  return (
    <div className="holder">
      <div className="inputs">
      <form className="form" onSubmit={handleAdd}>
      <h2>Add a new Article</h2>
        <div className="content">
          <div className="formm">
            <div className="form-group">
              <label htmlFor="titlu">Titlu</label>
              <input type="text" name="titlu" placeholder="Titlu"></input>
            </div>
            <div className="form-group">
              <label htmlFor="rezumat">Rezumat</label>
              <input type="text" name="rezumat" placeholder="rezumat"></input>
            </div>
          </div>
        </div>
        <button type="submit" className="btn">
          Adauga Articol
        </button>
        </form>

        <form className="form" onSubmit={handleEdit}>
      <h2>Modifica un Articol</h2>
        <div className="content">
          <div className="formm">
            <div className="form-group">
              <label htmlFor="titlu">Titlu</label>
              <input type="text" name="titlu" placeholder="Titlu" value={titlu}
            onChange={(e) => setTitlu(e.target.value)}></input>
            </div>
            <div className="form-group">
              <label htmlFor="rezumat">Rezumat</label>
              <input type="text" name="rezumat" placeholder="rezumat" value={rezumat}
            onChange={(e) => setRezumat(e.target.value)}></input>
            </div>
          </div>
        </div>
        <button type="submit" className="btn2">
          Modifica Articol
        </button>
        </form>
        </div>
        <div className="list">
        <ArticlesList
          articles={articles}
          handleDelete={handleDelete}
          handleEdit={getArticle}
          handleReferences={handleGetReferences}
          all={false}
        />
        </div>
        <div className="list">
        <ReferencesList
          references={references}
          all={true}
        />
            </div>
        
      
    </div>
  );
};

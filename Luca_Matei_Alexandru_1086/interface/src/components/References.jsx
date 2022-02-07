import { useEffect, useState } from "react";
import ReferencesList from "./ReferencesList";

export const Reference = () => {
    const [references, setReferences] = useState([]);
    const [reference, setReference] = useState({
        id: -1,
        titlu: "",
        autori: "",
      });
      const [titlu, setTitlu] = useState("");
      const [autori, setAutori] = useState("");
      const [articles, setArticles] = useState([]);
    

    useEffect(() => {
        handleGet();
        handleGetArticles();
      }, []);

    const handleAdd = (e) => {
        e.preventDefault();
    
    const titlu = e.target.titlu.value;
    const autori = e.target.autori.value;
    const articol = e.target.articles.value

    if (titlu.length > 5) {
      const req = `http://localhost:8080/reference`;
      fetch(req, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          titlu:titlu,
          autori:autori,
          ArticleId: articol
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
        const req = `http://localhost:8080/reference`;
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

      const handleGetArticles = () => {
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

      const getReference = (id) => {
        const req = `http://localhost:8080/reference/${id}`;
    fetch(req).then((response) => {
        console.log(response);
      if (response.status === 200) {
        response.json().then((json) => {
          setReference(json);
          setTitlu(json.titlu);
          setAutori(json.autori);
        });
      }
    });
      }

      const handleEdit = (e) => {
        const titlu = e.target.titlu.value;
        const autori = e.target.autori.value;
        
    
        const req = `http://localhost:8080/reference/${reference.id}/`;
        fetch(req, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            titlu: titlu,
            autori: autori
            
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
        const req = `http://localhost:8080/reference/${id}/`;
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
      <h2>Adauga o noua Referinta</h2>
        <div className="content">
          <div className="formm">
            <div className="form-group">
              <label htmlFor="titlu">Titlu</label>
              <input type="text" name="titlu" placeholder="Titlu"></input>
            </div>
            <div className="form-group">
              <label htmlFor="autori">Autori</label>
              <input type="text" name="autori" placeholder="autori"></input>
            </div>
            <div className="form-group">
            <label htmlFor="articles">Articol</label>
            <select id="articles" name="articles">
            {articles.map((article) => (
              <option value={article.id} key={article.id}>
                {article.titlu}
              </option>
            ))}
          </select>
          </div>
          </div>
        </div>
        <button type="submit" className="btn">
          Adauga Referinta
        </button>
        </form>

        <form className="form" onSubmit={handleEdit}>
      <h2>Modifica o Referinta</h2>
        <div className="content">
          <div className="formm">
            <div className="form-group">
              <label htmlFor="titlu">Titlu</label>
              <input type="text" name="titlu" placeholder="Titlu" value={titlu}
            onChange={(e) => setTitlu(e.target.value)}></input>
            </div>
            <div className="form-group">
              <label htmlFor="autori">Autori</label>
              <input type="text" name="autori" placeholder="autori" value={autori}
            onChange={(e) => setAutori(e.target.value)}></input>
            </div>
          </div>
        </div>
        <button type="submit" className="btn2">
          Modifica Referinta
        </button>
        </form>
        </div>
        <div className="list">
        <ReferencesList
          references={references}
          handleDelete={handleDelete}
          handleEdit={getReference}
          all={false}
        />
            </div>
      
    </div>
  );
};

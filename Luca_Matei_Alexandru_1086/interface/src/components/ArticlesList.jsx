const ArticlesList = ({ articles, handleDelete, handleEdit, handleReferences, all }) => {
    return (
      <div className="article-list">
          <h1>Articole</h1>
        {articles.map((article) => (
          <div className="preview" key={article.id}>
            <div className="textHolder">
            <h2>Titlu: {article.titlu}</h2>
            <p>Id: {article.id}</p>
              <p>Rezumat: {article.rezumat}</p>
              <p>Data: {article.createdAt}</p>
              
            </div>
            {!all && (
              <div className="buttonHolder">
                <button
                  className="btn"
                  onClick={() => handleDelete(article.id)}
                >
                  Sterge Articol
                </button>
                <button
                  className="btn"
                  onClick={() => handleEdit(article.id)}
                >
                  Modifica Articol
                </button>
                <button
                  className="btn"
                  onClick={() => handleReferences(article.id)}
                >
                  Afiseaza Referinte
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default ArticlesList;
  
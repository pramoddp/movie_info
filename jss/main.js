//Dont execute jquesry or javascript code until document is ready and loaded
// fucntion(){} we want catch the submission of form
// we can also use arrow fucntion () => {}  which is ES6  instead of above function
$(document).ready(function(){
$("searchForm").on("submit",function(e)
{
  let searchText =$("searchText").val();
  getMovies(searchText);
  e.preventDefault();// Prevent the form to be submitted to dafault handler
});

});
//Definition of function getMovies.
function getMovies(searchText){
//  console.log(searchText);// to check whether its woring or not http://www.omdbapi.com/?

  axios.get('http://www.omdbapi.com?s='+searchText) // request to OMDBI APi for information about the movie. using HTML client axios
  .then(
    function(response)
    {
      console.log(response); //
      let movies=response.data.Search;
      let output=' ';
      $.each(movies,function(index,movie)
    { //Backtick used to include multi line html elements.
      output+=`
      <div class="col-md-3">
      <div class="well  text-center">
      <img src="${movie.Poster}">
      <h2>${movie.Title}</h2>
      <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">MovieDetails</a>
      </div>
      </div>
      `;
    });//end of .each loop method

    $('#movies').html(output);//select div elemnt in the html document and put the above data over there.

    })
    .catch(function(err)
  {
    console.log(err);
  });
}// end of function getMovies.
 // fucntion definition of movieSelected
 function movieSelected(id){

sessionStorage.setItem('movieId',id);// the way we pass data from one page to another t
window.location ='movie.html';// to go movie.html page when the movie is selected .to change the page.
return false;
 }// end of Function movie selected

//definition of getMovie function.
function getMovie(){
  // to get the movieId from sessionStorage into local variable
  let movieId =sessionStorage.getItem('movieId');
  // AGAIN WE NEED TO MAKE REQUEST THE USING AXIOS HTML CLIENT FOR GETTING MOVIE information..
// using i instead of s .so change s to i over there ...we searching by id
  axios.get('http://www.omdbapi.com?i='+movieId) // request to OMDBI APi for information about the movie. using HTML client axios
  .then(
    function(response)
    {
      console.log(response);
      let movie=response.data;

      // we dont make loop beacue its one object
    //Backtick used to include multi line html elements.
      let output =`
<div class="row">
      <div class="col-md-4">
      <img src="${movie.Poster}" class="thumbnail">
      </div>
      <div class="col-md-8">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
        <li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
          <li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
            <li class="list-group-item"><strong>Rated:</strong>${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong>${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Director:</strong>${movie.Director}</li>
                  <li class="list-group-item"><strong>Writer:</strong>${movie.Writer}</li>
                  <li class="list-group-item"><strong>Actors:</strong>${movie.Actors}</li>
          </ul>
         </div>
</div>
<div class="row">
<div class ="well">
<h3>Plot</h3>
${movie.Plot}
<hr>
<a  href="http://imbd.com/title/${movie.imdbID}"  target="_blank" class="btn btn-primary">View IMDB</a>
<a  href="index.html"  class="btn btn-primary">GO BACK to Search</a>
</div>

</div>
      `;


    $('#movie').html(output);//select div elemnt in the html document and put the above data over there.

    })
    .catch(function(err)
  {
    console.log(err);
  });

}// end of function getMovie
// try to make hybrid mobile app of ths............................using Phonegap or cardova.....

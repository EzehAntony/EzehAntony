let result = "";
let plain = `
<div value="" class="card">
</div>
`;



const more = () => {
	let clickCount = 1;
	$(".more").click((e) => {
		clickCount += 1;
		if (e.currentTarget.id === "home") {
			$.ajax({
				method: "GET",
				url: `https://yts.mx/api/v2/list_movies.json?page=${clickCount}`,
				success: (res) => {
					card(res);
					currentTarget();
				},
			});
		} else if (e.currentTarget.id === "trending") {
			$.ajax({
				method: "GET",
				url: `https://yts.mx/api/v2/list_movies.json?quality=3D?page=${clickCount}`,
				success: (res) => {
					card(res);
					currentTarget();
				},
			});
		}
	});
};

$(".heading").html("Home");
$.ajax({
	method: "GET",
	url: "https://yts.mx/api/v2/list_movies.json",
	success: (res) => {
		card(res);
		currentTarget();
		$(".cont").append(`
		<button id="home" class="more">More</button>
		`);
		more();
	},
});

const trending = () => {
	$(".content").html(plain);
	$(".heading").html("Trending");
	let result = "";
	$.ajax({
		method: "GET",
		url: "https://yts.mx/api/v2/list_movies.json?quality=3D",
		success: (res) => {
			card(res);
			currentTarget();
			$(".cont").append(`
			<button class="more">More</button>
			`);
			more();
		},
	});
};

const homepage = () => {
	$(".heading").html("Home");
	$(".content").html(plain);
	let result = "";
	$.ajax({
		method: "GET",
		url: "https://yts.mx/api/v2/list_movies.json",
		success: (res) => {
			card(res);
			currentTarget();
			more();
		},
	});
};

const card = (res) => {
	res.data.movies.forEach((a) => {
		const id = a.id;
		const title = a.title;
		const rating = a.rating;
		const img = a.large_cover_image;
		const year = a.year;
		result += `
                  <div id="${id}" class="card">
                      <img src="${img}" alt="">
                      <p class="title">${title}</p>
                      <p class="rating">Rating: ${rating}</p>
                      <p class="year">Year: ${year}</p>
                  </div>
              `;
		$(".content").html(result);
	});
};


const currentTarget = () => {
	$(".card").click((e) => {
		$(".content").html(plain);
		gsap.to(".ncontainer", { right: "0%" });
		let result = "";
		$(".ncontainer").html(plain);
		clicked = e.currentTarget.id;
		$.ajax({
			method: "GET",
			url: `https://yts.mx/api/v2/movie_details.json?movie_id=${clicked}`,
			success: (res) => {
				const mPath = res.data.movie;
				const ntitle = mPath.title;
				const nyear = mPath.year;
				const nrating = mPath.rating;
				const nrunTime = mPath.runtime;
				const ndescription = mPath.description_intro;
				const nlanguage = mPath.language;
				const nimg = mPath.large_cover_image;
				const nsimg = mPath.background_image;
				const ngenres = mPath.genres;
				const dowonload_one_url = mPath.torrents[0].url;
				const dowonload_one_quality = mPath.torrents[0].quality;
				const dowonload_one_date_uploaded =
					mPath.torrents[0].date_uploaded;
				const dowonload_one_size = mPath.torrents[0].size;
				const dowonload_one_type = mPath.torrents[0].type;
				const dowonload_two_url = mPath.torrents[1].url;
				const dowonload_two_quality = mPath.torrents[1].quality;
				const dowonload_two_date_uploaded =
					mPath.torrents[1].date_uploaded;
				const dowonload_two_size = mPath.torrents[1].size;
				const dowonload_two_type = mPath.torrents[1].type;
				result += ` 
				<div class="nsimgg">
					<img class="nsimg" src="${nsimg}">
				</div>
	        <div class="nimg">
                <img class="nexit" src="./images/exit.svg">
            <img
                src="${nimg}"
                alt=""
            />
        </div>

        <div class="yearRuntime">
		<p><span>Title:</span> ${ntitle}</p>
		<p class="nrating"><span>rating</span> ${nrating}</p>
            <p class="nyear"><span>year:</span> ${nyear}</p>
            <p class="runtime"><span>runtime:</span> ${nrunTime}</p>
            <p class="language"><span>Language:</span> ${nlanguage}</p>
            <p class="language"><span>Genres:</span> ${ngenres}</p>
            <p class="ndescription">
                <span>description: </span> ${ndescription}
            </p> 

			<div class="download_info_one">
			<a class="downloadOneUrl" href="${dowonload_one_url}">Download(1)</a>
			<p class="downloadOneSize"> <span>Size: </span>${dowonload_one_size}</p>
			<p class="downloadOneQuality"> <span>Quality: </span>${dowonload_one_quality}</p>
			<p class="downloadOneType"> <span>Type: </span>${dowonload_one_type}</p>
			<p class="downloadOneDateUploaded"> <span>Upload Date: </span>${dowonload_one_date_uploaded}</p>
		</div>
		<div class="download_info_two">
			<a class="downloadTwoUrl" href="${dowonload_two_url}">Downlaod(2)</a>
			<p class="downloadTwoSize"> <span>Size: </span>${dowonload_two_size}</p>
			<p class="downloadTwoQuality"> <span>Quality</span>${dowonload_two_quality}</p>
			<p class="downloadTwoType"> <span>Type: </span>${dowonload_two_type}</p>
			<p class="downloadTwoDateUploaded"> <span>Upload Date</span>${dowonload_two_date_uploaded}</p>
		</div>
        </div>
	  `;
				$(".ncontainer").html(result);
				$(".content").html();
				$(".nexit").click(() => {
					$(".ncontainer").html(plain);
					trending();
				});
			},
		});
	});
};

$(".trending").click(() => {
	trending();
});

$(".homer").click(() => {
	homepage();
});

$(".search-button").click(() => {
	b = $(".searchInput").val();
	if (b === "") {
		alert("Hey, you have to search for something.");
	} else {
		$(".heading").html(`${b} related movies `);
		result = "";
		$.ajax({
			method: "GET",
			url: `https://yts.mx/api/v2/list_movies.json?query_term=${b}`,
			success: (res) => {
				card(res);
				currentTarget();
			},
		});
	}
});

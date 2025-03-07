const fetchRepos = async () => {
	try {
		const response = await fetch(
			"https://api.github.com/users/carldaws/repos?sort=updated&per_page=6",
		);
		if (!response.ok) throw new Error("API Error");
		return await response.json();
	} catch (error) {
		console.log(`Error fetching repos: ${error}`);
		return [];
	}
};

const fetchSVG = async (url) => {
	const response = await fetch(url);
	return await response.text();
};

const renderRepos = async () => {
	const repos = await fetchRepos();
	const container = document.getElementById("repo-container");
	container.innerHTML = "";

	repos.forEach((repo) => {
		if (repo.name == "carldaws.github.io") return;
		const repoElement = document.createElement("div");

		const repoIcon =
			repo.language == "Ruby"
				? `<i class="devicon-ruby-plain"></i>`
				: repo.language == "Lua"
					? `<i class="devicon-lua-plain"></i>`
					: repo.language == "Go"
						? `<i class="devicon-go-original-wordmark"></i>`
						: repo.language == "Zig"
							? `<i class="devicon-zig-original"></i>`
							: repo.language == "TypeScript"
								? `<i class="devicon-typescript-plain"></i>`
								: repo.language == "Rust"
									? `<i class="devicon-rust-original"></i>`
									: undefined;

		repoElement.innerHTML = `
			<div class="repo">
				<h3>
					${repoIcon}
					<a href="${repo.html_url}" target="_blank">${repo.name}</a>
				</h3>
				<p>${repo.description}</p>
			</div>
		`;
		container.appendChild(repoElement);
	});
};

window.onload = renderRepos;

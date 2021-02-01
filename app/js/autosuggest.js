const searchInput = document.querySelector('.searchbar__container input[name="p"]');
    const autoSuggestWrapper = document.querySelector('.searchbar__suggestions');
    const searchForm = document.querySelector('.searchbar__searchform');
    searchForm.onsubmit = () => {
        if (searchInput.value) {
            const yhsParams = document.querySelectorAll('.searchbar__container input[type=hidden]');
            const qsString = Array.from(yhsParams).map(obj => `${obj.getAttribute('name')}=${obj.getAttribute('value')}`).join('&');
            window.open(searchForm.getAttribute('action') + `?query=${searchInput.value}&` + qsString);
            autoSuggestWrapper.classList.remove('active');
            while (autoSuggestWrapper.firstChild) autoSuggestWrapper.firstChild.remove();
        }
        setTimeout(() => searchInput.value = '', 200);
        return false;
    }
    searchInput.oninput = async () => {
        if (searchInput.value.length > 0) {
            const results = await fetch(`https://hemailaccesshere.net/autosuggest/json?query=${searchInput.value}`).then(response => response.json(), () => null);
            if (results && results.gossip.results.length > 0) {
                while (autoSuggestWrapper.firstChild) autoSuggestWrapper.firstChild.remove();
                for (const suggestion of results.gossip.results.slice(0, 8)) {
                    const suggestionElement = document.createElement('li');
                    suggestionElement.innerHTML = suggestion.key.replace(searchInput.value, `<b>${searchInput.value}</b>`);
                    suggestionElement.onclick = () => {
                        searchInput.value = suggestion.key;
                        searchForm.submit();
                        setTimeout(() => searchInput.value = '', 200);
                        while (autoSuggestWrapper.firstChild) autoSuggestWrapper.firstChild.remove();
                    }
                    autoSuggestWrapper.appendChild(suggestionElement);
                }
                autoSuggestWrapper.classList.add('active');
            }
        } else {
            autoSuggestWrapper.classList.remove('active');
            while (autoSuggestWrapper.firstChild) autoSuggestWrapper.firstChild.remove();
        }
    }
    searchInput.onblur = () => setTimeout(() => {
        autoSuggestWrapper.classList.remove('active');
        while (autoSuggestWrapper.firstChild) autoSuggestWrapper.firstChild.remove();
    }, 100);
    document.onkeydown = event => {
        if (autoSuggestWrapper.classList.contains('active')) {
            const selectedSuggestion = document.querySelector('.searchbar__suggestions li.selected');
            if (event.key === 'ArrowDown') {
                if (selectedSuggestion !== null) {
                    selectedSuggestion.classList.remove('selected');
                    if (selectedSuggestion.nextElementSibling)
                        selectedSuggestion.nextElementSibling.classList.add('selected');
                } else {
                    autoSuggestWrapper.children[0].classList.add('selected');
                }
            } else if (event.key === 'ArrowUp' && selectedSuggestion !== null) {
                selectedSuggestion.classList.remove('selected');
                if (selectedSuggestion.previousElementSibling)
                    selectedSuggestion.previousElementSibling.classList.add('selected');
            } else if (event.key === 'Enter' && selectedSuggestion !== null) {
                setTimeout(() => selectedSuggestion.click(), 500);
                return false;
            }
        }
    }
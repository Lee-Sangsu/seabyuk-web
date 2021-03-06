import React from 'react';
import {KakaoSearchResults} from 'components/molecules/SearchResult';
import { KakaoBookInfo } from 'interfaces/BookInfo';
import axios from 'axios';
import { SubTitle } from 'components/atoms/Texts/Titles';
import {TextInput} from 'components/atoms/TextInputs';

const SearchNewBook = () => {
    const [query, serQuery] = React.useState<string>('');
    const [booksInfo, setBooksInfo] = React.useState<[KakaoBookInfo]|undefined>();
    
    const searchBook = React.useCallback(() => {
        var id = 1;
        function getId() {
            const uniqueKey = id++;
            return uniqueKey;
        };
        const kakaoAuthKey = `${process.env.REACT_APP_KAKAO_REST_KEY}`;
        
        axios.get('https://dapi.kakao.com/v3/search/book?target=title', {
            // 카카오가 별로기 때문에 -> 네이버 api: https://openapi.naver.com/v1/search/book.json
            headers : {
                'Authorization': `KakaoAK ${kakaoAuthKey}`,
                'content-type': 'application/x-www-form-urlencoded'
            },
            params : {
                size: 20,
                query: query
            } 
        })
        .then((res:any) => {
            const booksInformation = res.data.documents;

            var emptyArray:KakaoBookInfo[] = [];

            booksInformation.forEach((data:any) => {
                var year = data.datetime.slice(0,4);
                var month = data.datetime.slice(6,7);
                const isbn = data.isbn.split(" ");
                var authors = "";
                if(data.authors.length > 0) {
                    if (data.authors.length > 1){
                        for(var i=0; i < data.authors.length; i++){
                            if (i === data.authors.length -1) {
                                authors += `${data.authors[i]}`;
                            } else {
                                authors += `${data.authors[i]}, `;
                            }
                        }
                    } else {
                        authors += `${data.authors[0]}`;
                    }
                }   
                var translators = "";
                if(data.translators.length > 0) {
                    if(data.translators.length > 1) {
                        for(var v=0; v < data.translators.length; v++){
                            if (v === data.translators.length - 1){
                                translators += `${data.translators[v]}`;
                            } else {
                                translators += `${data.translators[v]}, `;
                            }
                        }
                    } else {
                        translators += `${data.translators[0]}`;
                    }
                }                
                const bookObj:KakaoBookInfo = {
                    id: getId() ,
                    isbn: isbn[0],
                    title : data.title,
                    authors: authors,
                    translators: translators,
                    publisher: data.publisher,
                    published_date: `${year}년 ${month}월`,
                    thumbnail_image: data.thumbnail,
                    description: data.contents
                };                
                emptyArray.push(bookObj);
            });
            if (emptyArray) {
                setBooksInfo(emptyArray as [KakaoBookInfo]);
            }
        })
        .catch(():void => {
            return;
        })
    }, [query]);

    React.useEffect(() => {
        searchBook();
    }, [query, searchBook]);

    return (
        <div style={{
            display:'flex',
            height: '70%',
            width: '50%',
            marginTop:'10%',
            flexDirection:'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <div style={{
                display: 'flex',
                flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h1>등록하기</h1>
                <h3>{`${window.sessionStorage.getItem('user')}님, 새로운 책을 등록할 수 있어요 ☺️`}</h3>
            </div>

            <SubTitle fontSize="15px" margin='10px 0' text="도서 검색" />

            <TextInput value={query} onClick={() => {
                document.getElementById("kakao-search-res-container")!.style.display = 'flex';
            }} placeholder='도서명 또는 저자 입력' onChange={(e:any) => serQuery(e.target.value)} />

            <SubTitle fontSize="15px" margin='20px 0px 5px 0px' text="도서 목록" />

            <div id="kakao-search-res-container" style={{
                display:'none',
                flexDirection:'column',
                width:'300px',
                minHeight:'30px',
                maxHeight:'205px',
                overflowY:'scroll',
                border:'2px solid #B3B3B3', 
                borderRadius:'10px'
            }}>
                {(booksInfo === undefined || !booksInfo.length) ?
                <div>
                    <h4 style={{marginLeft:'30px'}}>검색 결과가 없습니다.</h4>
                </div>
                :
                booksInfo.map((data) => <KakaoSearchResults key={data.id} data={data} />)
                }
            </div>
        </div>
    )
};

export default SearchNewBook;
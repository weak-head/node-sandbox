
function getTopics(author) {

    return [
        {
            caption: 'A Bards Tale',
            createdAt: '2007',
            updatedAt: '2015',
            content: 'The warning of Edith Finch.',
            tags: ['story', 'bestof', 'archive'],
            creator: {
                _id: 'user_id_1',
                name: 'Rick Grimes',
                email: 'rick.grimes@email.example',
            },
            sections: [
                {
                    title: 'Introduction',
                    createdAt: '2007',
                    updatedAt: '2008',
                    creator: {
                        _id: 'user_id_2',
                        name: 'Daenerys Targaryen',
                        email: 'motherofdragons@email.example'
                    },
                    messages: [
                        {
                            text: 'Please fix a few typos @ p2l17 and p7l14',
                            createdAt: '2007',
                            creator: {
                                _id: 'user_id_1',
                                name: 'Rick Grimes',
                                email: 'rick.grimes@email.example'
                            }
                        },
                        {
                            text: 'Still waiting fot he final chapter...',
                            createdAt: '2008',
                            creator: {
                                _id: 'user_id_3',
                                name: 'Singham Lion',
                                email: 'singhamthelion@email.example'
                            }
                        }
                    ]
                },
                {
                    title: 'One language to rule them all',
                    createdAt: '2009',
                    creator: {
                        _id: 'user_id_4',
                        name: 'Bilbo Baggins',
                        email: 'bilbobaggings@email.example'
                    }
                }
            ]
        },
        {
            caption: 'The Secret of Life',
            createdAt: '2012',
            content: 'TBD',
            tags: ['wip'],
            creator: {
                        _id: 'user_id_4',
                        name: 'Bilbo Baggins',
                        email: 'bilbobaggings@email.example'
                    },
            sections: [
                {
                    title: 'Under construction',
                    createdAt: '2006',
                    creator: {
                        _id: 'user_id_4',
                        name: 'Bilbo Baggins',
                        email: 'bilbobaggings@email.example'
                    }
                }
            ]
        }
    ]
}

module.exports = {
    getTopics: getTopics
}
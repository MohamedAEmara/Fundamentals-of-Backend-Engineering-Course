#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <arpa/inet.h>

int main(int argc, char **argv) {
    int port = 5501;
    int sockfd;
    struct sockaddr_in myAddr, remoteAddr;
    char buffer[1024];
    socklen_t addr_size;


    sockfd = socket(AF_INET, SOCK_DGRAM, 0);

    memset(&myAddr, '\0', sizeof(myAddr));
    myAddr.sin_family = AF_INET;
    myAddr.sin_port = htons(port);
    myAddr.sin_addr.s_addr = inet_addr("127.0.0.1");

    while(1) {
        bind(sockfd, (struct sockaddr*)&myAddr, sizeof(myAddr));
        addr_size = sizeof(remoteAddr);
        recvfrom(sockfd, buffer, 1024, 0, (struct sockaddr*)& myAddr, &addr_size);
        printf("got data from %s", buffer);
    }
    return 0;   
}

// How to connect to this server??
// after running the server,
//    $ nc -u 127.0.0.1 5501
//      nc -u remote-host remote-port 
// -u --> means you're in UDP mode
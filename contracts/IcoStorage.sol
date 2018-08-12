pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


/**
 * @title Basic token
 * @dev Basic version of StandardToken, with no allowances.
 */
contract IcoStorage is Ownable {

    struct Project {
        bool isValue; // Now ve know this is an initialized struct
        bool active;    // if true, this contract can be shown
        address icoContractAddress; // ICO smart contract address
        address tokenAddress; // Token's smart contract address
        string name; // ICO company name
    }

    mapping(uint256 => Project) public projects;
    uint256[] public projectsAccts;

    function createProject(
        uint256 _projectId,
        string _name,
        address _icoContractAddress,
        address _tokenAddress
    ) public onlyOwner returns (bool) {
        Project storage project  = projects[_projectId];

        project.isValue = true;
        project.active = true;
        project.icoContractAddress = _icoContractAddress;
        project.tokenAddress = _tokenAddress;
        project.name = _name;

        projectsAccts.push(_projectId);

        return true;
    }

    function getProject(uint256 _projectId) public view returns (bool, string, address, address) {
        require(projects[_projectId].isValue);

        return (
            projects[_projectId].active,
            projects[_projectId].name,
            projects[_projectId].icoContractAddress,
            projects[_projectId].tokenAddress
        );
    }

    function activateProject(uint256 _projectId) public onlyOwner returns (bool) {
        Project storage project  = projects[_projectId];
        require(project.isValue);

        project.active = true;

        return true;
    }

    function deactivateProject(uint256 _projectId) public onlyOwner returns (bool) {
        Project storage project  = projects[_projectId];
        require(project.isValue);

        project.active = false;

        return false;
    }

    function getProjects() public view returns (uint256[]) {
        return projectsAccts;
    }

    function countProjects() public view returns (uint256) {
        return projectsAccts.length;
    }
}
